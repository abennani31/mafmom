import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MAF } from 'app/shared/model/maf.model';
import { MAFService } from './maf.service';
import { MAFComponent } from './maf.component';
import { MAFDetailComponent } from './maf-detail.component';
import { MAFUpdateComponent } from './maf-update.component';
import { MAFDeletePopupComponent } from './maf-delete-dialog.component';
import { IMAF } from 'app/shared/model/maf.model';

@Injectable({ providedIn: 'root' })
export class MAFResolve implements Resolve<IMAF> {
  constructor(private service: MAFService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMAF> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MAF>) => response.ok),
        map((mAF: HttpResponse<MAF>) => mAF.body)
      );
    }
    return of(new MAF());
  }
}

export const mAFRoute: Routes = [
  {
    path: '',
    component: MAFComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'mafmomApp.mAF.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MAFDetailComponent,
    resolve: {
      mAF: MAFResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mafmomApp.mAF.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MAFUpdateComponent,
    resolve: {
      mAF: MAFResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mafmomApp.mAF.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MAFUpdateComponent,
    resolve: {
      mAF: MAFResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mafmomApp.mAF.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const mAFPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MAFDeletePopupComponent,
    resolve: {
      mAF: MAFResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mafmomApp.mAF.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
