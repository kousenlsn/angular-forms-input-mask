import { Component, Input } from '@angular/core';

import { demoAppAnimations } from '../utils/app.animations';

@Component({
  selector: 'demo-card',
  template: `
    <div class="demo-card-container">
      <span class="title-container">{{title}}</span>

      <div class="input-container">
        <ng-content select="input"></ng-content>
        <ng-content select="[wrapper]"></ng-content>
      </div>

      <div class="output-container">
        Output:
        <ng-content select="[output]"></ng-content>
      </div>

      <div class="code-template">
        <div
          class="title"
          (click)="codeExpanded = !codeExpanded"
        >
          <span>Code</span>
          <span>{{codeExpanded ? '-' : '+'}}</span>
        </div>
        <div
          *ngIf="codeExpanded"
          class="content"
          @slide
        >
          <ng-content select="[code]"></ng-content>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./demo-card.component.scss'],
  animations: demoAppAnimations,
})
export class DemoCardComponent {
  @Input() title = 'title';

  codeExpanded = false;
}
