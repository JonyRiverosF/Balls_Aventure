import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkinsPage } from './skins.page';

describe('SkinsPage', () => {
  let component: SkinsPage;
  let fixture: ComponentFixture<SkinsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SkinsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
