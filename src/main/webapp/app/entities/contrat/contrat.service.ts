import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IContrat } from 'app/shared/model/contrat.model';

type EntityResponseType = HttpResponse<IContrat>;
type EntityArrayResponseType = HttpResponse<IContrat[]>;

@Injectable({ providedIn: 'root' })
export class ContratService {
  public resourceUrl = SERVER_API_URL + 'api/contrats';

  constructor(protected http: HttpClient) {}

  create(contrat: IContrat): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(contrat);
    return this.http
      .post<IContrat>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(contrat: IContrat): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(contrat);
    return this.http
      .put<IContrat>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IContrat>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IContrat[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(contrat: IContrat): IContrat {
    const copy: IContrat = Object.assign({}, contrat, {
      dateDemande: contrat.dateDemande != null && contrat.dateDemande.isValid() ? contrat.dateDemande.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateDemande = res.body.dateDemande != null ? moment(res.body.dateDemande) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((contrat: IContrat) => {
        contrat.dateDemande = contrat.dateDemande != null ? moment(contrat.dateDemande) : null;
      });
    }
    return res;
  }
}
