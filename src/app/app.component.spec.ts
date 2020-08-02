import { TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFormsInputMasksModule } from 'angular-forms-input-masks';
import { AppComponent } from './app.component';
import { DemoCardComponent } from './components/demo-card.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DemoCardComponent,
      ],
      imports: [
        BrowserModule,
        AngularFormsInputMasksModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
