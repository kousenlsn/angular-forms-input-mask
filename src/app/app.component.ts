import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <h1>Angular Forms Input masks!</h1>
    <h3>Mask your @angular/forms formControl inputs with these directives!</h3>

    <div [formGroup]="demoFormGroup" class="demo-container">

      <div class="demo-column">
        <h2>Currency Mask</h2>
      </div>

      <div class="demo-column">
        <h2>Pattern Mask</h2>
      </div>

      <div class="demo-column">
        <h2>Miscelaneous</h2>

        <demo-card>
          <div #input>
            DOES THIS WORK??
          </div>
        </demo-card>
      </div>

      <input
        formControlName="simpleMask"
        angularFormsMask="DDD-CCC.WWW"
        [validateMaskInput]="true"
      >

      <input 
        formControlName="simpleCurrency"
        angularFormsCurrency
      >

      {{demoFormGroup.get('simpleCurrency').value || 0}}

      <ng-container *ngIf="demoFormGroup.get('simpleMask')?.errors">
        Validation error here.
      </ng-container>

    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-forms-input-mask';

  demoFormGroup = new FormGroup({
    simpleCurrency: new FormControl('0'),
    simpleMask: new FormControl(null),
  });
}
