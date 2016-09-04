/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { MarketGroupsService } from './market-groups.service';

describe('Service: MarketGroups', () => {
  beforeEach(() => {
    addProviders([MarketGroupsService]);
  });

  it('should ...',
    inject([MarketGroupsService],
      (service: MarketGroupsService) => {
        expect(service).toBeTruthy();
      }));
});
