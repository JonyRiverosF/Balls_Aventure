import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { OlvidasteCPage } from './olvidaste-c.page';

describe('OlvidasteCPage', () => {
  let component: OlvidasteCPage;
  let fixture: ComponentFixture<OlvidasteCPage>;
  const fakeActivatedRoute = {
    snapshot :{data: {}}
  }
  

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers:[{provide: ActivatedRoute, useValue:fakeActivatedRoute},SQLite]
     }).compileComponents();
     
    fixture = TestBed.createComponent(OlvidasteCPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
