import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TiempoCargaPage } from './tiempo-carga.page';

describe('TiempoCargaPage', () => {
  let component: TiempoCargaPage;
  let fixture: ComponentFixture<TiempoCargaPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(TiempoCargaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
