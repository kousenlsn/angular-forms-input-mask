import { ElementRef } from '@angular/core';

import { unmaskedNumericValueFor } from './mask.utils';

export function cursorPositionFor(el: ElementRef<any> | any): number {
  return (el.nativeElement || el).selectionStart;
}

/**
 * Set cursor position at a given `nativeEl` from a `ElementRef` or its wrapper.
 */
export function setCursorPositionFor(el: ElementRef<any> | any, nextPos: number) {
  const nativeEl = el.nativeElement || el;
  nativeEl.selectionStart = nativeEl.selectionEnd = nextPos;
}

/** Adjusts cursorPosition for input element. Skips non decimal/letter chars. 
* @param addingAtLeft cursor will it keep its position.
* @param decimalsOnly if should takes into consideration both decimals and letters for determining cursor position */
export function nextCursorPositionFor(
  el: ElementRef<any> | any,
  previousValue: string,
  nextValue: string,

  addingAtLeft = false,
  decimalsOnly = false,
  removingAtLeft = false,
): number {
  const initialCursorPosition = cursorPositionFor(el);
  const maskCheck = decimalsOnly ? /[^\d]/ : /[^\w]/;

  const isAdding = removingAtLeft || !addingAtLeft
    ? nextValue.length > previousValue?.length
    : nextValue.length >= previousValue?.length;

  let nextCursorPosition = initialCursorPosition;

  if (addingAtLeft && previousValue) {
    if (isAdding) {
      nextCursorPosition += nextValue.length - previousValue.length - 1;
    } else if (previousValue.length > nextValue.length) {
      nextCursorPosition += nextValue.length - previousValue.length + 1;
    } else {
      nextCursorPosition += (unmaskedNumericValueFor(previousValue) > unmaskedNumericValueFor(nextValue) ? 1 : 0);
    }
  }

  let testPosition = nextCursorPosition - 1;
  while (maskCheck.test(nextValue[testPosition])) {
    if (isAdding) {
      testPosition++;
      nextCursorPosition++;
    } else {
      testPosition--;
      nextCursorPosition--;
    }

    if (testPosition < 0) {
      nextCursorPosition = initialCursorPosition + 1;
      break;
    }
  }

  return nextCursorPosition;
}
