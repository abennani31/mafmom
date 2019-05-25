/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MafmomTestModule } from '../../../test.module';
import { MAFHistoryDeleteDialogComponent } from 'app/entities/maf-history/maf-history-delete-dialog.component';
import { MAFHistoryService } from 'app/entities/maf-history/maf-history.service';

describe('Component Tests', () => {
  describe('MAFHistory Management Delete Component', () => {
    let comp: MAFHistoryDeleteDialogComponent;
    let fixture: ComponentFixture<MAFHistoryDeleteDialogComponent>;
    let service: MAFHistoryService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MafmomTestModule],
        declarations: [MAFHistoryDeleteDialogComponent]
      })
        .overrideTemplate(MAFHistoryDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MAFHistoryDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MAFHistoryService);
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
