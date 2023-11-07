import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { LogrosPage } from './logros.page';

describe('LogrosPage', () => {
  let component: LogrosPage;
  let fixture: ComponentFixture<LogrosPage>;
  const fakeActivatedRoute = {
    snapshot :{data: {}}
  }

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers:[{provide: ActivatedRoute, useValue:fakeActivatedRoute},SQLite]
     }).compileComponents();

    fixture = TestBed.createComponent(LogrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
