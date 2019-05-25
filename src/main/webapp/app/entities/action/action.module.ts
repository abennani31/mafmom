import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { MafmomSharedModule } from 'app/shared';
import {
  ActionComponent,
  ActionDetailComponent,
  ActionUpdateComponent,
  ActionDeletePopupComponent,
  ActionDeleteDialogComponent,
  actionRoute,
  actionPopupRoute
} from './';

const ENTITY_STATES = [...actionRoute, ...actionPopupRoute];

@NgModule({
  imports: [MafmomSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [ActionComponent, ActionDetailComponent, ActionUpdateComponent, ActionDeleteDialogComponent, ActionDeletePopupComponent],
  entryComponents: [ActionComponent, ActionUpdateComponent, ActionDeleteDialogComponent, ActionDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MafmomActionModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
