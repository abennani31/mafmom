/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MafmomTestModule } from '../../../test.module';
import { MAFDeleteDialogComponent } from 'app/entities/maf/maf-delete-dialog.component';
import { MAFService } from 'app/entities/maf/maf.service';

describe('Component Tests', () => {
  describe('MAF Management Delete Component', () => {
    let comp: MAFDeleteDialogComponent;
    let fixture: ComponentFixture<MAFDeleteDialogComponent>;
    let service: MAFService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MafmomTestModule],
        declarations: [MAFDeleteDialogComponent]
      })
        .overrideTemplate(MAFDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MAFDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MAFService);
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
