/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MafmomTestModule } from '../../../test.module';
import { MAFDetailComponent } from 'app/entities/maf/maf-detail.component';
import { MAF } from 'app/shared/model/maf.model';

describe('Component Tests', () => {
  describe('MAF Management Detail Component', () => {
    let comp: MAFDetailComponent;
    let fixture: ComponentFixture<MAFDetailComponent>;
    const route = ({ data: of({ mAF: new MAF(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MafmomTestModule],
        declarations: [MAFDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MAFDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MAFDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.mAF).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
