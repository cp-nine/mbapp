import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalAccountComponent } from './withdrawal-account.component';

describe('WithdrawalAccountComponent', () => {
  let component: WithdrawalAccountComponent;
  let fixture: ComponentFixture<WithdrawalAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawalAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
