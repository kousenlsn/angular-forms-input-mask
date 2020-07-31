import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularFormsInputMasksComponent } from './angular-forms-input-masks.component';

describe('AngularFormsInputMasksComponent', () => {
  let component: AngularFormsInputMasksComponent;
  let fixture: ComponentFixture<AngularFormsInputMasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularFormsInputMasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularFormsInputMasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
