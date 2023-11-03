import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NivelMedioPage } from './nivel-medio.page';

describe('NivelMedioPage', () => {
  let component: NivelMedioPage;
  let fixture: ComponentFixture<NivelMedioPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(NivelMedioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
