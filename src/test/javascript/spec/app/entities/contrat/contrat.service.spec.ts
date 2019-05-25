/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ContratService } from 'app/entities/contrat/contrat.service';
import { IContrat, Contrat, EtatQueue } from 'app/shared/model/contrat.model';

describe('Service Tests', () => {
  describe('Contrat Service', () => {
    let injector: TestBed;
    let service: ContratService;
    let httpMock: HttpTestingController;
    let elemDefault: IContrat;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(ContratService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Contrat(0, 'AAAAAAA', currentDate, EtatQueue.PREDEMANDE);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            dateDemande: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a Contrat', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateDemande: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateDemande: currentDate
          },
          returnedFromService
        );
        service
          .create(new Contrat(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Contrat', async () => {
        const returnedFromService = Object.assign(
          {
            queueName: 'BBBBBB',
            dateDemande: currentDate.format(DATE_TIME_FORMAT),
            etatQueue: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateDemande: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of Contrat', async () => {
        const returnedFromService = Object.assign(
          {
            queueName: 'BBBBBB',
            dateDemande: currentDate.format(DATE_TIME_FORMAT),
            etatQueue: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateDemande: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Contrat', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
