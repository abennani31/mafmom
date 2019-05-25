/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MafmomTestModule } from '../../../test.module';
import { ContratDeleteDialogComponent } from 'app/entities/contrat/contrat-delete-dialog.component';
import { ContratService } from 'app/entities/contrat/contrat.service';

describe('Component Tests', () => {
  describe('Contrat Management Delete Component', () => {
    let comp: ContratDeleteDialogComponent;
    let fixture: ComponentFixture<ContratDeleteDialogComponent>;
    let service: ContratService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MafmomTestModule],
        declarations: [ContratDeleteDialogComponent]
      })
        .overrideTemplate(ContratDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ContratDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContratService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
