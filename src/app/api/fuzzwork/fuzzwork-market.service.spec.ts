/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FuzzworkMarketService } from './fuzzwork-market.service';

describe('Service: FuzzworkMarket', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FuzzworkMarketService]
    });
  });

  it('should ...', inject([FuzzworkMarketService], (service: FuzzworkMarketService) => {
    expect(service).toBeTruthy();
  }));
});
