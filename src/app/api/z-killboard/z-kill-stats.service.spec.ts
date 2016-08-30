/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { ZKillStatsService } from './z-kill-stats.service';

describe('Service: ZKillStats', () => {
  beforeEach(() => {
    addProviders([ZKillStatsService]);
  });

  it('should ...',
    inject([ZKillStatsService],
      (service: ZKillStatsService) => {
        expect(service).toBeTruthy();
      }));
});
