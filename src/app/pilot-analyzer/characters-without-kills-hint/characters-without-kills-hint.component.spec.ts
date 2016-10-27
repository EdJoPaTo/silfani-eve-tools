/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CharactersWithoutKillsHintComponent } from './characters-without-kills-hint.component';

describe('CharactersWithoutKillsHintComponent', () => {
  let component: CharactersWithoutKillsHintComponent;
  let fixture: ComponentFixture<CharactersWithoutKillsHintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharactersWithoutKillsHintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersWithoutKillsHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
