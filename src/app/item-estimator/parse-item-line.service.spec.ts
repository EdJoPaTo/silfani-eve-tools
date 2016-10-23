/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ParseItemLineService } from './parse-item-line.service';

describe('Service: ParseItemLine', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParseItemLineService]
    });
  });

  it('should ...', inject([ParseItemLineService], (service: ParseItemLineService) => {
    expect(service).toBeTruthy();
  }));
});
