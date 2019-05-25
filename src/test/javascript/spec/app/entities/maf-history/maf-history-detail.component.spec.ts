/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MafmomTestModule } from '../../../test.module';
import { MAFHistoryDetailComponent } from 'app/entities/maf-history/maf-history-detail.component';
import { MAFHistory } from 'app/shared/model/maf-history.model';

describe('Component Tests', () => {
  describe('MAFHistory Management Detail Component', () => {
    let comp: MAFHistoryDetailComponent;
    let fixture: ComponentFixture<MAFHistoryDetailComponent>;
    const route = ({ data: of({ mAFHistory: new MAFHistory(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MafmomTestModule],
        declarations: [MAFHistoryDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MAFHistoryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MAFHistoryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.mAFHistory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
