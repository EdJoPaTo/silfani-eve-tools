/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { MissionService } from './mission.service';

describe('Service: Mission', () => {
  beforeEach(() => {
    addProviders([MissionService]);
  });

  it('should ...',
    inject([MissionService],
      (service: MissionService) => {
        expect(service).toBeTruthy();
      }));
});
