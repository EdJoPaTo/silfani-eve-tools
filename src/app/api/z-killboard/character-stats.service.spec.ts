/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { CharacterStatsService } from './character-stats.service';

describe('Service: CharacterStats', () => {
  beforeEach(() => {
    addProviders([CharacterStatsService]);
  });

  it('should ...',
    inject([CharacterStatsService],
      (service: CharacterStatsService) => {
        expect(service).toBeTruthy();
      }));
});
