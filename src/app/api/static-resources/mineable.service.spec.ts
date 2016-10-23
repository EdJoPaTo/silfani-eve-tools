/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { MineableService } from './mineable.service';

describe('Service: Mineable', () => {
  beforeEach(() => {
    addProviders([MineableService]);
  });

  it('should ...',
    inject([MineableService],
      (service: MineableService) => {
        expect(service).toBeTruthy();
      }));
});
