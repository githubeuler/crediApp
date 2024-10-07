import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LiquidacionPage } from './liquidacion.page';

describe('LiquidacionPage', () => {
  let component: LiquidacionPage;
  let fixture: ComponentFixture<LiquidacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
