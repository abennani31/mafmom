import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { MafmomSharedModule } from 'app/shared';
import {
  MAFComponent,
  MAFDetailComponent,
  MAFUpdateComponent,
  MAFDeletePopupComponent,
  MAFDeleteDialogComponent,
  mAFRoute,
  mAFPopupRoute
} from './';

const ENTITY_STATES = [...mAFRoute, ...mAFPopupRoute];

@NgModule({
  imports: [MafmomSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [MAFComponent, MAFDetailComponent, MAFUpdateComponent, MAFDeleteDialogComponent, MAFDeletePopupComponent],
  entryComponents: [MAFComponent, MAFUpdateComponent, MAFDeleteDialogComponent, MAFDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MafmomMAFModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
