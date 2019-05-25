/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { MafmomTestModule } from '../../../test.module';
import { MAFUpdateComponent } from 'app/entities/maf/maf-update.component';
import { MAFService } from 'app/entities/maf/maf.service';
import { MAF } from 'app/shared/model/maf.model';

describe('Component Tests', () => {
  describe('MAF Management Update Component', () => {
    let comp: MAFUpdateComponent;
    let fixture: ComponentFixture<MAFUpdateComponent>;
    let service: MAFService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MafmomTestModule],
        declarations: [MAFUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MAFUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MAFUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MAFService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MAF(123);
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
        const entity = new MAF();
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
