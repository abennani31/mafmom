import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { MafmomSharedModule } from 'app/shared';
import {
  MAFHistoryComponent,
  MAFHistoryDetailComponent,
  MAFHistoryUpdateComponent,
  MAFHistoryDeletePopupComponent,
  MAFHistoryDeleteDialogComponent,
  mAFHistoryRoute,
  mAFHistoryPopupRoute
} from './';

const ENTITY_STATES = [...mAFHistoryRoute, ...mAFHistoryPopupRoute];

@NgModule({
  imports: [MafmomSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MAFHistoryComponent,
    MAFHistoryDetailComponent,
    MAFHistoryUpdateComponent,
    MAFHistoryDeleteDialogComponent,
    MAFHistoryDeletePopupComponent
  ],
  entryComponents: [MAFHistoryComponent, MAFHistoryUpdateComponent, MAFHistoryDeleteDialogComponent, MAFHistoryDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MafmomMAFHistoryModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
