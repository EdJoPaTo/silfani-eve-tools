/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { CharacterIdService } from './character-id.service';

describe('Service: CharacterId', () => {
  beforeEach(() => {
    addProviders([CharacterIdService]);
  });

  it('should ...',
    inject([CharacterIdService],
      (service: CharacterIdService) => {
        expect(service).toBeTruthy();
      }));
});
