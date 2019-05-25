import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IMAF, MAF } from 'app/shared/model/maf.model';
import { MAFService } from './maf.service';

@Component({
  selector: 'jhi-maf-update',
  templateUrl: './maf-update.component.html'
})
export class MAFUpdateComponent implements OnInit {
  mAF: IMAF;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    version: [],
    publie: []
  });

  constructor(protected mAFService: MAFService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ mAF }) => {
      this.updateForm(mAF);
      this.mAF = mAF;
    });
  }

  updateForm(mAF: IMAF) {
    this.editForm.patchValue({
      id: mAF.id,
      version: mAF.version,
      publie: mAF.publie
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const mAF = this.createFromForm();
    if (mAF.id !== undefined) {
      this.subscribeToSaveResponse(this.mAFService.update(mAF));
    } else {
      this.subscribeToSaveResponse(this.mAFService.create(mAF));
    }
  }

  private createFromForm(): IMAF {
    const entity = {
      ...new MAF(),
      id: this.editForm.get(['id']).value,
      version: this.editForm.get(['version']).value,
      publie: this.editForm.get(['publie']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMAF>>) {
    result.subscribe((res: HttpResponse<IMAF>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
