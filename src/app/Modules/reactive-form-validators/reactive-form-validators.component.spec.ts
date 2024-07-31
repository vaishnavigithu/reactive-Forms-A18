import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormValidatorsComponent } from './reactive-form-validators.component';

describe('ReactiveFormValidatorsComponent', () => {
  let component: ReactiveFormValidatorsComponent;
  let fixture: ComponentFixture<ReactiveFormValidatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormValidatorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveFormValidatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
