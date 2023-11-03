import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NivelDificilPage } from './nivel-dificil.page';

describe('NivelDificilPage', () => {
  let component: NivelDificilPage;
  let fixture: ComponentFixture<NivelDificilPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(NivelDificilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
