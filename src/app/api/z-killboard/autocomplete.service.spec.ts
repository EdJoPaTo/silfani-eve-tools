/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AutocompleteService } from './autocomplete.service';

describe('Service: Autocomplete', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutocompleteService]
    });
  });

  it('should ...', inject([AutocompleteService], (service: AutocompleteService) => {
    expect(service).toBeTruthy();
  }));
});
