import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MafmomSharedLibsModule, MafmomSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [MafmomSharedLibsModule, MafmomSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [MafmomSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MafmomSharedModule {
  static forRoot() {
    return {
      ngModule: MafmomSharedModule
    };
  }
}
