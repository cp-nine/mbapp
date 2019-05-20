import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopupExternalComponent } from './topup-external.component';

describe('TopupExternalComponent', () => {
  let component: TopupExternalComponent;
  let fixture: ComponentFixture<TopupExternalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopupExternalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopupExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
