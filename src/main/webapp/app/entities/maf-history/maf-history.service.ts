import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMAFHistory } from 'app/shared/model/maf-history.model';

type EntityResponseType = HttpResponse<IMAFHistory>;
type EntityArrayResponseType = HttpResponse<IMAFHistory[]>;

@Injectable({ providedIn: 'root' })
export class MAFHistoryService {
  public resourceUrl = SERVER_API_URL + 'api/maf-histories';

  constructor(protected http: HttpClient) {}

  create(mAFHistory: IMAFHistory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(mAFHistory);
    return this.http
      .post<IMAFHistory>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(mAFHistory: IMAFHistory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(mAFHistory);
    return this.http
      .put<IMAFHistory>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMAFHistory>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMAFHistory[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(mAFHistory: IMAFHistory): IMAFHistory {
    const copy: IMAFHistory = Object.assign({}, mAFHistory, {
      startDate: mAFHistory.startDate != null && mAFHistory.startDate.isValid() ? mAFHistory.startDate.toJSON() : null,
      endDate: mAFHistory.endDate != null && mAFHistory.endDate.isValid() ? mAFHistory.endDate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
      res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((mAFHistory: IMAFHistory) => {
        mAFHistory.startDate = mAFHistory.startDate != null ? moment(mAFHistory.startDate) : null;
        mAFHistory.endDate = mAFHistory.endDate != null ? moment(mAFHistory.endDate) : null;
      });
    }
    return res;
  }
}
