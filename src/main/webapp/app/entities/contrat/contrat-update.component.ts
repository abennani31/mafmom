import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IContrat, Contrat } from 'app/shared/model/contrat.model';
import { ContratService } from './contrat.service';
import { IMAF } from 'app/shared/model/maf.model';
import { MAFService } from 'app/entities/maf';

@Component({
  selector: 'jhi-contrat-update',
  templateUrl: './contrat-update.component.html'
})
export class ContratUpdateComponent implements OnInit {
  contrat: IContrat;
  isSaving: boolean;

  mafs: IMAF[];

  editForm = this.fb.group({
    id: [],
    queueName: [],
    dateDemande: [],
    etatQueue: [],
    mAF: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected contratService: ContratService,
    protected mAFService: MAFService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ contrat }) => {
      this.updateForm(contrat);
      this.contrat = contrat;
    });
    this.mAFService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMAF[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMAF[]>) => response.body)
      )
      .subscribe((res: IMAF[]) => (this.mafs = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(contrat: IContrat) {
    this.editForm.patchValue({
      id: contrat.id,
      queueName: contrat.queueName,
      dateDemande: contrat.dateDemande != null ? contrat.dateDemande.format(DATE_TIME_FORMAT) : null,
      etatQueue: contrat.etatQueue,
      mAF: contrat.mAF
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const contrat = this.createFromForm();
    if (contrat.id !== undefined) {
      this.subscribeToSaveResponse(this.contratService.update(contrat));
    } else {
      this.subscribeToSaveResponse(this.contratService.create(contrat));
    }
  }

  private createFromForm(): IContrat {
    const entity = {
      ...new Contrat(),
      id: this.editForm.get(['id']).value,
      queueName: this.editForm.get(['queueName']).value,
      dateDemande:
        this.editForm.get(['dateDemande']).value != null ? moment(this.editForm.get(['dateDemande']).value, DATE_TIME_FORMAT) : undefined,
      etatQueue: this.editForm.get(['etatQueue']).value,
      mAF: this.editForm.get(['mAF']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContrat>>) {
    result.subscribe((res: HttpResponse<IContrat>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackMAFById(index: number, item: IMAF) {
    return item.id;
  }
}
