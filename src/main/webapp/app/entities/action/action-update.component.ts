import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IAction, Action } from 'app/shared/model/action.model';
import { ActionService } from './action.service';
import { IContrat } from 'app/shared/model/contrat.model';
import { ContratService } from 'app/entities/contrat';
import { IMAFHistory } from 'app/shared/model/maf-history.model';
import { MAFHistoryService } from 'app/entities/maf-history';

@Component({
  selector: 'jhi-action-update',
  templateUrl: './action-update.component.html'
})
export class ActionUpdateComponent implements OnInit {
  action: IAction;
  isSaving: boolean;

  contrats: IContrat[];

  mafhistories: IMAFHistory[];

  editForm = this.fb.group({
    id: [],
    typeAction: [],
    libelleAction: [],
    contrat: [],
    mAFHistory: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected actionService: ActionService,
    protected contratService: ContratService,
    protected mAFHistoryService: MAFHistoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ action }) => {
      this.updateForm(action);
      this.action = action;
    });
    this.contratService
      .query({ filter: 'action-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IContrat[]>) => mayBeOk.ok),
        map((response: HttpResponse<IContrat[]>) => response.body)
      )
      .subscribe(
        (res: IContrat[]) => {
          if (!this.action.contrat || !this.action.contrat.id) {
            this.contrats = res;
          } else {
            this.contratService
              .find(this.action.contrat.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IContrat>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IContrat>) => subResponse.body)
              )
              .subscribe(
                (subRes: IContrat) => (this.contrats = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.mAFHistoryService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMAFHistory[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMAFHistory[]>) => response.body)
      )
      .subscribe((res: IMAFHistory[]) => (this.mafhistories = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(action: IAction) {
    this.editForm.patchValue({
      id: action.id,
      typeAction: action.typeAction,
      libelleAction: action.libelleAction,
      contrat: action.contrat,
      mAFHistory: action.mAFHistory
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const action = this.createFromForm();
    if (action.id !== undefined) {
      this.subscribeToSaveResponse(this.actionService.update(action));
    } else {
      this.subscribeToSaveResponse(this.actionService.create(action));
    }
  }

  private createFromForm(): IAction {
    const entity = {
      ...new Action(),
      id: this.editForm.get(['id']).value,
      typeAction: this.editForm.get(['typeAction']).value,
      libelleAction: this.editForm.get(['libelleAction']).value,
      contrat: this.editForm.get(['contrat']).value,
      mAFHistory: this.editForm.get(['mAFHistory']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAction>>) {
    result.subscribe((res: HttpResponse<IAction>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackContratById(index: number, item: IContrat) {
    return item.id;
  }

  trackMAFHistoryById(index: number, item: IMAFHistory) {
    return item.id;
  }
}
