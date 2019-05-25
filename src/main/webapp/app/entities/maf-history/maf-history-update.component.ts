import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IMAFHistory, MAFHistory } from 'app/shared/model/maf-history.model';
import { MAFHistoryService } from './maf-history.service';

@Component({
  selector: 'jhi-maf-history-update',
  templateUrl: './maf-history-update.component.html'
})
export class MAFHistoryUpdateComponent implements OnInit {
  mAFHistory: IMAFHistory;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    startDate: [],
    endDate: []
  });

  constructor(protected mAFHistoryService: MAFHistoryService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ mAFHistory }) => {
      this.updateForm(mAFHistory);
      this.mAFHistory = mAFHistory;
    });
  }

  updateForm(mAFHistory: IMAFHistory) {
    this.editForm.patchValue({
      id: mAFHistory.id,
      startDate: mAFHistory.startDate != null ? mAFHistory.startDate.format(DATE_TIME_FORMAT) : null,
      endDate: mAFHistory.endDate != null ? mAFHistory.endDate.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const mAFHistory = this.createFromForm();
    if (mAFHistory.id !== undefined) {
      this.subscribeToSaveResponse(this.mAFHistoryService.update(mAFHistory));
    } else {
      this.subscribeToSaveResponse(this.mAFHistoryService.create(mAFHistory));
    }
  }

  private createFromForm(): IMAFHistory {
    const entity = {
      ...new MAFHistory(),
      id: this.editForm.get(['id']).value,
      startDate:
        this.editForm.get(['startDate']).value != null ? moment(this.editForm.get(['startDate']).value, DATE_TIME_FORMAT) : undefined,
      endDate: this.editForm.get(['endDate']).value != null ? moment(this.editForm.get(['endDate']).value, DATE_TIME_FORMAT) : undefined
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMAFHistory>>) {
    result.subscribe((res: HttpResponse<IMAFHistory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
