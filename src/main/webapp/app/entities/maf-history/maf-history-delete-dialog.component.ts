import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMAFHistory } from 'app/shared/model/maf-history.model';
import { MAFHistoryService } from './maf-history.service';

@Component({
  selector: 'jhi-maf-history-delete-dialog',
  templateUrl: './maf-history-delete-dialog.component.html'
})
export class MAFHistoryDeleteDialogComponent {
  mAFHistory: IMAFHistory;

  constructor(
    protected mAFHistoryService: MAFHistoryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.mAFHistoryService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'mAFHistoryListModification',
        content: 'Deleted an mAFHistory'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-maf-history-delete-popup',
  template: ''
})
export class MAFHistoryDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mAFHistory }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MAFHistoryDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.mAFHistory = mAFHistory;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/maf-history', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/maf-history', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
