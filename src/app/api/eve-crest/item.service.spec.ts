/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { ItemService } from './item.service';

describe('Service: Item', () => {
  beforeEach(() => {
    addProviders([ItemService]);
  });

  it('should ...',
    inject([ItemService],
      (service: ItemService) => {
        expect(service).toBeTruthy();
      }));
});
