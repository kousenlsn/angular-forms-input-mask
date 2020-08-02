import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { demoAppAnimations } from './utils/app.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: demoAppAnimations,
})
export class AppComponent {

  demoFormGroup = new FormGroup({
    validateMask: new FormControl(null),
    simpleMask: new FormControl(null),
    multiMask: new FormControl(null),
    unmaskedMask: new FormControl(null),

    simpleCurrency: new FormControl(null),
    customCurrency: new FormControl(null),
    clearCurrency: new FormControl(null),
    custom2Currency: new FormControl(null),

    wrappedMask: new FormControl(null),
  });

}
