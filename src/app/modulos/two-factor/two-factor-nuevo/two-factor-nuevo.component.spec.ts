import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFactorNuevoComponent } from './two-factor-nuevo.component';

describe('TwoFactorNuevoComponent', () => {
  let component: TwoFactorNuevoComponent;
  let fixture: ComponentFixture<TwoFactorNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoFactorNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoFactorNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
