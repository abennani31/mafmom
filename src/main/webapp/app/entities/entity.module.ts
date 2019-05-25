import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'action',
        loadChildren: './action/action.module#MafmomActionModule'
      },
      {
        path: 'contrat',
        loadChildren: './contrat/contrat.module#MafmomContratModule'
      },
      {
        path: 'maf',
        loadChildren: './maf/maf.module#MafmomMAFModule'
      },
      {
        path: 'maf-history',
        loadChildren: './maf-history/maf-history.module#MafmomMAFHistoryModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MafmomEntityModule {}
