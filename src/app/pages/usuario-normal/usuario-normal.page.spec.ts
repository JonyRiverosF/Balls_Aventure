import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuarioNormalPage } from './usuario-normal.page';

describe('UsuarioNormalPage', () => {
  let component: UsuarioNormalPage;
  let fixture: ComponentFixture<UsuarioNormalPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(UsuarioNormalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
