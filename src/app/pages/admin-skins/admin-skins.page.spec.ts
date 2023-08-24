import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminSkinsPage } from './admin-skins.page';

describe('AdminSkinsPage', () => {
  let component: AdminSkinsPage;
  let fixture: ComponentFixture<AdminSkinsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminSkinsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
