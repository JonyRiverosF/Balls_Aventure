import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ModificarPerfilPage } from './modificar-perfil.page';

describe('ModificarPerfilPage', () => {
  let component: ModificarPerfilPage;
  let fixture: ComponentFixture<ModificarPerfilPage>;
  const fakeActivatedRoute = {
    snapshot :{data: {}}
  }

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers:[{provide: ActivatedRoute, useValue:fakeActivatedRoute},SQLite]
     }).compileComponents();

    fixture = TestBed.createComponent(ModificarPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
