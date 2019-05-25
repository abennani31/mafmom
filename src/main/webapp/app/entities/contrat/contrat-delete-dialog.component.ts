import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContrat } from 'app/shared/model/contrat.model';
import { ContratService } from './contrat.service';

@Component({
  selector: 'jhi-contrat-delete-dialog',
  templateUrl: './contrat-delete-dialog.component.html'
})
export class ContratDeleteDialogComponent {
  contrat: IContrat;

  constructor(protected contratService: ContratService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.contratService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'contratListModification',
        content: 'Deleted an contrat'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-contrat-delete-popup',
  template: ''
})
export class ContratDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ contrat }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ContratDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.contrat = contrat;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/contrat', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/contrat', { outlets: { popup: null } }]);
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
