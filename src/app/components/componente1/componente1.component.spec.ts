import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { Componente1Component } from './componente1.component';

describe('Componente1Component', () => {
  let component: Componente1Component;
  let fixture: ComponentFixture<Componente1Component>;
  const fakeActivatedRoute = {
    snapshot :{data: {}}
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Componente1Component ],
      imports: [IonicModule.forRoot()],
      providers:[{provide: ActivatedRoute, useValue:fakeActivatedRoute}]
    }).compileComponents();

    fixture = TestBed.createComponent(Componente1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
