import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuarioAdminPage } from './usuario-admin.page';

describe('UsuarioAdminPage', () => {
  let component: UsuarioAdminPage;
  let fixture: ComponentFixture<UsuarioAdminPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UsuarioAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
