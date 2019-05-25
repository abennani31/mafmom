import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Contrat } from 'app/shared/model/contrat.model';
import { ContratService } from './contrat.service';
import { ContratComponent } from './contrat.component';
import { ContratDetailComponent } from './contrat-detail.component';
import { ContratUpdateComponent } from './contrat-update.component';
import { ContratDeletePopupComponent } from './contrat-delete-dialog.component';
import { IContrat } from 'app/shared/model/contrat.model';

@Injectable({ providedIn: 'root' })
export class ContratResolve implements Resolve<IContrat> {
  constructor(private service: ContratService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IContrat> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Contrat>) => response.ok),
        map((contrat: HttpResponse<Contrat>) => contrat.body)
      );
    }
    return of(new Contrat());
  }
}

export const contratRoute: Routes = [
  {
    path: '',
    component: ContratComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mafmomApp.contrat.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ContratDetailComponent,
    resolve: {
      contrat: ContratResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mafmomApp.contrat.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ContratUpdateComponent,
    resolve: {
      contrat: ContratResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mafmomApp.contrat.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ContratUpdateComponent,
    resolve: {
      contrat: ContratResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mafmomApp.contrat.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const contratPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ContratDeletePopupComponent,
    resolve: {
      contrat: ContratResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mafmomApp.contrat.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
