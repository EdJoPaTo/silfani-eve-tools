/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { AutocompleteService } from './autocomplete.service';

describe('Service: Autocomplete', () => {
  beforeEach(() => {
    addProviders([AutocompleteService]);
  });

  it('should ...',
    inject([AutocompleteService],
      (service: AutocompleteService) => {
        expect(service).toBeTruthy();
      }));
});
