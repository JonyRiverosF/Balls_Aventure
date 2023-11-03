import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminLogrosPage } from './admin-logros.page';

describe('AdminLogrosPage', () => {
  let component: AdminLogrosPage;
  let fixture: ComponentFixture<AdminLogrosPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(AdminLogrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
