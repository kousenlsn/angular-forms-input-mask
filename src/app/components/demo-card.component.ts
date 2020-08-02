import { Component } from '@angular/core';

@Component({
  selector: 'demo-card',
  template: `
    <div>
      <ng-content select="#input"></ng-content>   //why this doesnt work?
      <ng-content select="output"></ng-content>
      <ng-content select="code"></ng-content>
        //make this examplable
    </div>
  `,
  // styleUrls: ['./demo-card.component.scss']
})
export class DemoCardComponent {}
