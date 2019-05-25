import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MAFHistory } from 'app/shared/model/maf-history.model';
import { MAFHistoryService } from './maf-history.service';
import { MAFHistoryComponent } from './maf-history.component';
import { MAFHistoryDetailComponent } from './maf-history-detail.component';
import { MAFHistoryUpdateComponent } from './maf-history-update.component';
import { MAFHistoryDeletePopupComponent } from './maf-history-delete-dialog.component';
import { IMAFHistory } from 'app/shared/model/maf-history.model';

@Injectable({ providedIn: 'root' })
export class MAFHistoryResolve implements Resolve<IMAFHistory> {
  constructor(private service: MAFHistoryService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMAFHistory> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MAFHistory>) => response.ok),
        map((mAFHistory: HttpResponse<MAFHistory>) => mAFHistory.body)
      );
    }
    return of(new MAFHistory());
  }
}

export const mAFHistoryRoute: Routes = [
  {
    path: '',
    component: MAFHistoryComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mafmomApp.mAFHistory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MAFHistoryDetailComponent,
    resolve: {
      mAFHistory: MAFHistoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mafmomApp.mAFHistory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MAFHistoryUpdateComponent,
    resolve: {
      mAFHistory: MAFHistoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mafmomApp.mAFHistory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MAFHistoryUpdateComponent,
    resolve: {
      mAFHistory: MAFHistoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mafmomApp.mAFHistory.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const mAFHistoryPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MAFHistoryDeletePopupComponent,
    resolve: {
      mAFHistory: MAFHistoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mafmomApp.mAFHistory.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
