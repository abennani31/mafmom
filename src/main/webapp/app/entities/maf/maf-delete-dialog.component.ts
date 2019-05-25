import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMAF } from 'app/shared/model/maf.model';
import { MAFService } from './maf.service';

@Component({
  selector: 'jhi-maf-delete-dialog',
  templateUrl: './maf-delete-dialog.component.html'
})
export class MAFDeleteDialogComponent {
  mAF: IMAF;

  constructor(protected mAFService: MAFService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.mAFService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'mAFListModification',
        content: 'Deleted an mAF'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-maf-delete-popup',
  template: ''
})
export class MAFDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mAF }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MAFDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.mAF = mAF;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/maf', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/maf', { outlets: { popup: null } }]);
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
