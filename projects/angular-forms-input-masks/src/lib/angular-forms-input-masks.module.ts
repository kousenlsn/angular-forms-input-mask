import { NgModule } from '@angular/core';
import { AngularFormsMaskDirective } from './directives/angular-forms-mask.directive';
import { AngularFormsCurrencyMaskDirective } from './directives/angular-forms-currency-mask.directive';

@NgModule({
  declarations: [
    AngularFormsCurrencyMaskDirective,
    AngularFormsMaskDirective,
  ],
  imports: [],
  exports: [
    AngularFormsCurrencyMaskDirective,
    AngularFormsMaskDirective,
  ],
})
export class AngularFormsInputMasksModule { }
