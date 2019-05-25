/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { MafmomTestModule } from '../../../test.module';
import { MAFHistoryUpdateComponent } from 'app/entities/maf-history/maf-history-update.component';
import { MAFHistoryService } from 'app/entities/maf-history/maf-history.service';
import { MAFHistory } from 'app/shared/model/maf-history.model';

describe('Component Tests', () => {
  describe('MAFHistory Management Update Component', () => {
    let comp: MAFHistoryUpdateComponent;
    let fixture: ComponentFixture<MAFHistoryUpdateComponent>;
    let service: MAFHistoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MafmomTestModule],
        declarations: [MAFHistoryUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MAFHistoryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MAFHistoryUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MAFHistoryService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MAFHistory(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new MAFHistory();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
