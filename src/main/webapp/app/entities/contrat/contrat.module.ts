import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { MafmomSharedModule } from 'app/shared';
import {
  ContratComponent,
  ContratDetailComponent,
  ContratUpdateComponent,
  ContratDeletePopupComponent,
  ContratDeleteDialogComponent,
  contratRoute,
  contratPopupRoute
} from './';

const ENTITY_STATES = [...contratRoute, ...contratPopupRoute];

@NgModule({
  imports: [MafmomSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ContratComponent,
    ContratDetailComponent,
    ContratUpdateComponent,
    ContratDeleteDialogComponent,
    ContratDeletePopupComponent
  ],
  entryComponents: [ContratComponent, ContratUpdateComponent, ContratDeleteDialogComponent, ContratDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MafmomContratModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
