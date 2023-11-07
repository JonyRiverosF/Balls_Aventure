import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { AdminSkinsPage } from './admin-skins.page';

describe('AdminSkinsPage', () => {
  let component: AdminSkinsPage;
  let fixture: ComponentFixture<AdminSkinsPage>;
  const fakeActivatedRoute = {
    snapshot :{data: {}}
  }

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers:[{provide: ActivatedRoute, useValue:fakeActivatedRoute},SQLite]
     }).compileComponents();

    fixture = TestBed.createComponent(AdminSkinsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
