import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFormsInputMasksModule } from 'angular-forms-input-masks';
import { AppComponent } from './app.component';
import { DemoCardComponent } from './components/demo-card.component';

@NgModule({
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
