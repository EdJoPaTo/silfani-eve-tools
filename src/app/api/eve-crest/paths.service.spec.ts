/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { PathsService } from './paths.service';

describe('Service: Paths', () => {
  beforeEach(() => {
    addProviders([PathsService]);
  });

  it('should ...',
    inject([PathsService],
      (service: PathsService) => {
        expect(service).toBeTruthy();
      }));
});
