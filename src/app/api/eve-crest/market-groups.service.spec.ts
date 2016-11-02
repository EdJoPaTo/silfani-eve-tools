/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MarketGroupsService } from './market-groups.service';

describe('Service: MarketGroups', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarketGroupsService]
    });
  });

  it('should ...', inject([MarketGroupsService], (service: MarketGroupsService) => {
    expect(service).toBeTruthy();
  }));
});
