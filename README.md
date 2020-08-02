# angular-forms-input-mask


## angular-forms-input-mask
*Mask your @angular/forms formControl inputs with these directives!*

![CI](https://github.com/kousenlsn/angular-forms-input-mask/workflows/CI/badge.svg?branch=master&event=push)
![CD](https://github.com/kousenlsn/angular-forms-input-mask/workflows/CD/badge.svg)

### Features :mag_right:

- add to existitng **inputs** or **wrappers** to have it masked **without further needs**;
- enable **custom validation** over the mask format for existing formControls without trouble;
- keep a good user experience correctly by tracking **cursor positions** while typing or backspacing naturally;
- add **any number of masks** to a single input.

#### [Check out all the possibilities at the demo landpage.](https://kousenlsn.github.io/angular-forms-input-mask/)

### Usage :electric_plug:

1. ``npm install angular-forms-input-masks`` or ``yarn add angular-forms-input-masks``
2. import ``AngularFormsInputMasksModule`` module to your ``appModules`` or module to be used at
3. declare at any ``input`` of input wrapper the directives to supply your needs.

e.g.

      import { BrowserModule } from '@angular/platform-browser';
      import { NgModule } from '@angular/core';
      import { ReactiveFormsModule } from '@angular/forms';
      import { AngularFormsInputMasksModule } from 'angular-forms-input-masks';
      import { AppComponent } from './app.component';

      @NgModule({
        declarations: [
          AppComponent,
        ],
        imports: [
          BrowserModule,
          AngularFormsInputMasksModule,
          ReactiveFormsModule,
        ],
        providers: [],
        bootstrap: [AppComponent]
      })
      export class AppModule { }

      [...]

      <input formControlName="sampleInput" angularFormsCurrency/>
      <input [ngControl]="sampleGroup.get('sampleInput')" angularFormsMask="DDD-DDD-DDDD/>

### Options :green_book:

Mask Directive Parameters

- **ngControl**: required to work, either through formControlname or ngControl declaration. Always requires ngControl if the directive is used at an input wrapper;
- **angularFormsMask**: declaration option, the mask or masks that are to be displayed. ```D```: numbers; ```C```: letters; ```W```: both; All other characters are treated as part of the mask and just displayed. ```e.g. 'DDD.DDD.WW', ['DDD.DD', '(CC) WW - D']```
- **validateMaskInput**: add validation to formControl, so that the input should match the mask length, else it returns ``invalidLength`` validiation error at the ``ngControl``.
- **unmasked**: set the unmasked value to the formControl instead of the masked one, defaults to ``false``.

Currency Directive Parameters:

- **ngControl**: required to work, either through formControlname or ngControl declaration. Always requires ngControl if the directive is used at an input wrapper;
- **prefix**: defaults to ``$``, allows any value or empty;
- **thousandsSeparator**: defaults to ``white_space``;
- **decimalSeparator**: defaults to ``.``;
- **digitsAfterSeparator**: defaults to ``2``;
- **maxIntegerDigits**: how big tthe value allowed is, defaults to ``8``, or 1 000 000,00;
- **allowNegatives**: defaults to ``false``;
- **validateOnInit**: if marked, it will validate the initial value and mask it. In case it is ``null``, will fill the masked value for ``0``. Defaults to ``true``.


### Develop :construction_worker:

For running locally:

1. ``npm run build-lib``
2. ``npm start``
3. open at: ``localhost:4200``

### Composition :hammer:

- [rxjs](https://rxjs-dev.firebaseapp.com/) <br/>
- [angular](https://angular.io/) <br/>

### Anything else :

Feel free to contribute, report bugs, or [contact me](https://github.com/kousenlsn) for anything.

If you want to tip this poor fella:

![QR](https://user-images.githubusercontent.com/14895129/89111770-21def500-d430-11ea-860a-e3982082e530.png)