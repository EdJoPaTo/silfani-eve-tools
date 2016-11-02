/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ZKillStatsService } from './z-kill-stats.service';

describe('Service: ZKillStats', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZKillStatsService]
    });
  });

  it('should ...', inject([ZKillStatsService], (service: ZKillStatsService) => {
    expect(service).toBeTruthy();
  }));
});
