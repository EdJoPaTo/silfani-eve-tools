/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PilotListComponent } from './pilot-list.component';

describe('PilotListComponent', () => {
  let component: PilotListComponent;
  let fixture: ComponentFixture<PilotListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PilotListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PilotListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
