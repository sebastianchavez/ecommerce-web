import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaymentsMethodsComponent } from './admin-payments-methods.component';

describe('AdminPaymentsMethodsComponent', () => {
  let component: AdminPaymentsMethodsComponent;
  let fixture: ComponentFixture<AdminPaymentsMethodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPaymentsMethodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPaymentsMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
