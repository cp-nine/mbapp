import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopupAccountComponent } from './topup-account.component';

describe('TopupAccountComponent', () => {
  let component: TopupAccountComponent;
  let fixture: ComponentFixture<TopupAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopupAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopupAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
