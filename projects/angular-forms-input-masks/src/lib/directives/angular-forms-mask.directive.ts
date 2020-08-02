import { Directive, Optional, Self, OnDestroy, Input, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, NgControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { nextCursorPositionFor, setCursorPositionFor, cursorPositionFor } from '../utils/cursor.utils';
import { maskFormatValidator } from '../utils/mask-validation.utils';
import { unmaskedValueFor, matchAndReplaceFor } from '../utils/mask.utils';

@Directive({
  selector: '[angularFormsMask]',
})
export class AngularFormsMaskDirective implements OnDestroy, OnInit {
  /** can be infered with `formControlName` , or `[ngControl]` . The former is necessary if declared at a wrapper instead of an `<input/>` el. */
  @Input() ngControl: AbstractControl;
  /** 
   * Mask formats, accepts a single or multiple, matching by order. e.g "DDD-WWW.CCC"
   * 
   * D: numbers; C: letters; W: both; All other characters are treated as part of the mask just displayed. */
  @Input()
  set angularFormsMask(value: string | string[]) {
    this.mask = Array.isArray(value)
      ? [...value].sort((a, b) => a.length - a.length)
      : value;
  }
  /** Add validation so that the input should match the length of the mask, else returns `invalidLength` validation error at the `ngControl`. */
  @Input() validateMaskInput = false;
  /** Set clear values to the formControl */
  @Input() unmasked = false;

  private previousValue: string;
  private control: AbstractControl;
  private nativeEl: any;
  private mask: string | string[];
  private directiveExists$ = new Subject();

  constructor(@Optional() @Self() private selfNgControl: NgControl, private elRef: ElementRef) {}

  ngOnInit() {
    if (!this.mask) {
      console.warn('AngularFormsMaskDirective: A Mask value is required for the directive to be initiated.');
      return;
    }

    this.control = this.selfNgControl?.control ?? this.ngControl;
    if (!this.control) {
      console.warn('AngularFormsMaskDirective: A FormControl value is required for the directive to be initiated.');
      return;
    }

    this.nativeEl = this.elRef.nativeElement.hasChildNodes()
      ? this.elRef.nativeElement.getElementsByTagName('input')[0]
      : this.elRef.nativeElement;
    if (!this.nativeEl) {
      console.warn('AngularFormsMaskDirective: A elRef of type input is required for the directive to be initiated.');
      return;
    }

    if (this.validateMaskInput) {
      this.control.setValidators([
        Validators.required,
        maskFormatValidator(this.mask),
      ]);
    }

    this.control.valueChanges
      .pipe(
        startWith(this.control.value),
        takeUntil(this.directiveExists$)
      )
      .subscribe((value) => this.setValue(this.maskValueFor(value)));
  }

  ngOnDestroy() {
    this.directiveExists$.next();
    this.directiveExists$.unsubscribe();
  }

  private setValue(nextValue: string) {
    const nextCursorPosition = nextValue
      ? nextCursorPositionFor(this.nativeEl, this.previousValue, nextValue)
      : cursorPositionFor(this.nativeEl);

    this.previousValue = nextValue;

    this.control.setValue(nextValue, { emitEvent: false });

    if (this.unmasked && nextValue) {
      this.control.setValue(unmaskedValueFor(nextValue), {
        emitEvent: false,
        emitModelToViewChange: false,
      });
    }

    setCursorPositionFor(this.nativeEl, nextCursorPosition);
  }

  private maskValueFor(value: string | number): string {
    if (!value) return;

    const unmaskedValue = unmaskedValueFor(value);

    const nextMask = !Array.isArray(this.mask)
      ? this.mask
      : this.mask.find((mask) => unmaskedValueFor(mask).length >= unmaskedValue.length) || this.mask[this.mask.length - 1]

    return matchAndReplaceFor(unmaskedValue, nextMask);
  }
}
