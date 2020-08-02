import { Directive, Optional, Self, AfterViewInit, OnDestroy, Input, ElementRef, Renderer2 } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { startWith, takeUntil, filter, tap, map } from 'rxjs/operators';

import { maskedNumericValueFor, unmaskedNumericValueFor, hasNonDecimalCharacters, unmaskedValueFor } from '../utils/mask.utils';
import { nextCursorPositionFor, setCursorPositionFor, cursorPositionFor } from '../utils/cursor.utils';

@Directive({
  selector: '[angularFormsCurrency]',
})
export class AngularFormsCurrencyMaskDirective implements OnDestroy, AfterViewInit {
  /** can be infered with `formControlName` , or `[ngControl]` . The former is necessary if declared at a wrapper instead of an `<input/>` el. */
  @Input() ngControl: AbstractControl;
  @Input() prefix = '$';
  @Input() thousandsSeparator = ' ';
  @Input() decimalSeparator = '.';
  @Input() digitsAfterSeparator = 2;
  @Input() maxIntegerDigits = 8;
  @Input() allowNegatives = false;
  /** For when the form already has a initial value or is expected to boot as `zero *masked*`. */
  @Input() validateOnInit = true;

  private valueHasChanged = false;
  private previousValue: string;
  private control: AbstractControl;
  private nativeEl: any;
  private directiveExists$ = new Subject();

  constructor(
    @Optional() @Self() private selfNgControl: NgControl,
    private elRef: ElementRef) {}

  ngAfterViewInit() {
    this.control = this.selfNgControl?.control ?? this.ngControl;
    if (!this.control) {
      console.warn('AngularFormsCurrencyMaskDirective: A FormControl value is required for the directive to be initiated.');
      return;
    }
    
    this.nativeEl = this.elRef.nativeElement.hasChildNodes()
      ? this.elRef.nativeElement.getElementsByTagName('input')[0]
      : this.elRef.nativeElement;
    if (!this.nativeEl) {
      console.warn('AngularFormsCurrencyMaskDirective: A elRef of type input is required for the directive to be initiated.');
      return;
    }

    const boot = this.validateOnInit
      ? startWith(this.control.value as string)
      : tap(() => {});

    this.control.valueChanges
      .pipe(
        boot,
        filter((value: string | number) => {
          const lastValueWasChanged = this.valueHasChanged;
          this.valueHasChanged = false;

          return !this.previousValue ||
            unmaskedNumericValueFor(value) !== unmaskedNumericValueFor(this.previousValue) ||
            hasNonDecimalCharacters(value) ||
            !lastValueWasChanged;
        }),
        map((value: string | number) => value?.toString() ?? ''),
        takeUntil(this.directiveExists$),
      )
      .subscribe((value: string) => {
        this.adjustCursorIfSeparator(value);
        this.setValue(this.maskedValueFor(value), value.length < this.previousValue?.length);
      });
  }

  ngOnDestroy() {
    this.directiveExists$.next();
    this.directiveExists$.unsubscribe();
  }

  private setValue(nextValue: string, removing = false) {
    let nextCursorPosition = cursorPositionFor(this.nativeEl);

    if (nextValue) {
      nextCursorPosition = nextCursorPosition <= this.prefix.length + 1
        ? nextValue.length
        : nextCursorPositionFor(this.nativeEl, this.previousValue, nextValue, true, true, removing);
    }

    const wasInitialValue = this.valueHasChanged;

    this.valueHasChanged = !!this.previousValue;
    this.previousValue = nextValue;

    this.control.setValue(nextValue, { emitEvent: false });
    this.control.setValue(unmaskedNumericValueFor(nextValue), {
      emitEvent: true,
      emitModelToViewChange: false,
    });

    if (wasInitialValue) {
      nextCursorPosition = nextValue.length + 1;
    }

    setCursorPositionFor(this.nativeEl, nextCursorPosition);
  }

  private maskedValueFor(value: string): string {
    return maskedNumericValueFor(
      value,
      this.thousandsSeparator,
      this.decimalSeparator,
      this.prefix,
      this.digitsAfterSeparator,
      this.maxIntegerDigits,
      this.allowNegatives,
    );
  }

  private adjustCursorIfSeparator(value: string) {
    const decimalSeparatorPressed = value.indexOf(this.decimalSeparator) !== value.lastIndexOf(this.decimalSeparator);

    if (decimalSeparatorPressed) {
      const curPos = cursorPositionFor(this.elRef);
      const nextPos = curPos - 1 <= value.indexOf(this.decimalSeparator)
        ? value.length
        : value.indexOf(this.decimalSeparator) + 1;

      setCursorPositionFor(this.elRef, nextPos)
    }
  }
}
