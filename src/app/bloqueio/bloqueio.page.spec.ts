import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloqueioPage } from './bloqueio.page';

describe('BloqueioPage', () => {
  let component: BloqueioPage;
  let fixture: ComponentFixture<BloqueioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloqueioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloqueioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
