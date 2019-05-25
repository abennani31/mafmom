/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { MafmomTestModule } from '../../../test.module';
import { ContratUpdateComponent } from 'app/entities/contrat/contrat-update.component';
import { ContratService } from 'app/entities/contrat/contrat.service';
import { Contrat } from 'app/shared/model/contrat.model';

describe('Component Tests', () => {
  describe('Contrat Management Update Component', () => {
    let comp: ContratUpdateComponent;
    let fixture: ComponentFixture<ContratUpdateComponent>;
    let service: ContratService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MafmomTestModule],
        declarations: [ContratUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ContratUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContratUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContratService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Contrat(123);
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
        const entity = new Contrat();
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
