import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OlvidasteCPage } from './olvidaste-c.page';

describe('OlvidasteCPage', () => {
  let component: OlvidasteCPage;
  let fixture: ComponentFixture<OlvidasteCPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OlvidasteCPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
