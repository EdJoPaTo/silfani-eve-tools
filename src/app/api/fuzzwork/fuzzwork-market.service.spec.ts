/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { FuzzworkMarketService } from './fuzzwork-market.service';

describe('Service: FuzzworkMarket', () => {
  beforeEach(() => {
    addProviders([FuzzworkMarketService]);
  });

  it('should ...',
    inject([FuzzworkMarketService],
      (service: FuzzworkMarketService) => {
        expect(service).toBeTruthy();
      }));
});
