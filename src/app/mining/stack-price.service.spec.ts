/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { StackPriceService } from './stack-price.service';

describe('Service: StackPrice', () => {
  beforeEach(() => {
    addProviders([StackPriceService]);
  });

  it('should ...',
    inject([StackPriceService],
      (service: StackPriceService) => {
        expect(service).toBeTruthy();
      }));
});
