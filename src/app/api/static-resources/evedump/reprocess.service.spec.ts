/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { ReprocessService } from './reprocess.service';

describe('Service: Reprocess', () => {
  beforeEach(() => {
    addProviders([ReprocessService]);
  });

  it('should ...',
    inject([ReprocessService],
      (service: ReprocessService) => {
        expect(service).toBeTruthy();
      }));
});
