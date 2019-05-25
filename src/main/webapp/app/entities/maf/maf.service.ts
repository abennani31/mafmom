import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMAF } from 'app/shared/model/maf.model';

type EntityResponseType = HttpResponse<IMAF>;
type EntityArrayResponseType = HttpResponse<IMAF[]>;

@Injectable({ providedIn: 'root' })
export class MAFService {
  public resourceUrl = SERVER_API_URL + 'api/mafs';

  constructor(protected http: HttpClient) {}

  create(mAF: IMAF): Observable<EntityResponseType> {
    return this.http.post<IMAF>(this.resourceUrl, mAF, { observe: 'response' });
  }

  update(mAF: IMAF): Observable<EntityResponseType> {
    return this.http.put<IMAF>(this.resourceUrl, mAF, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMAF>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMAF[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
