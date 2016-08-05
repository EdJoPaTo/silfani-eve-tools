/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { PlayerListComponent } from './player-list.component';

describe('Component: PlayerList', () => {
  it('should create an instance', () => {
    let component = new PlayerListComponent();
    expect(component).toBeTruthy();
  });
});
