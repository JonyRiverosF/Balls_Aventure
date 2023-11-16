import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { UsocamaraPage } from './usocamara.page';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('UsocamaraPage', () => {
  let component: UsocamaraPage;
  let fixture: ComponentFixture<UsocamaraPage>;
  const fakeActivatedRoute = {
    snapshot :{data: {}}
  }

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers:[{provide: ActivatedRoute, useValue:fakeActivatedRoute},SQLite,HttpClient,HttpHandler]
     }).compileComponents();

    fixture = TestBed.createComponent(UsocamaraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
