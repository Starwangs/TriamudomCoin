import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDebitComponent } from './create-debit.component';

describe('CreateDebitComponent', () => {
  let component: CreateDebitComponent;
  let fixture: ComponentFixture<CreateDebitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDebitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
