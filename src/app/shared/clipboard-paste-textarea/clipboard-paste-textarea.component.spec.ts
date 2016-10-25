/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClipboardPasteTextareaComponent } from './clipboard-paste-textarea.component';

describe('ClipboardPasteTextareaComponent', () => {
  let component: ClipboardPasteTextareaComponent;
  let fixture: ComponentFixture<ClipboardPasteTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClipboardPasteTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClipboardPasteTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
