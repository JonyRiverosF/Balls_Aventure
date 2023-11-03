import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreadoresJuegoPage } from './creadores-juego.page';

describe('CreadoresJuegoPage', () => {
  let component: CreadoresJuegoPage;
  let fixture: ComponentFixture<CreadoresJuegoPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(CreadoresJuegoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
