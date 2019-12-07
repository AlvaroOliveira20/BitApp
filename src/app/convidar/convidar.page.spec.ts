import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvidarPage } from './convidar.page';

describe('ConvidarPage', () => {
  let component: ConvidarPage;
  let fixture: ComponentFixture<ConvidarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvidarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvidarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
