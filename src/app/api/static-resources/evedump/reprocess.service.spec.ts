/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReprocessService } from './reprocess.service';

describe('Service: Reprocess', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReprocessService]
    });
  });

  it('should ...', inject([ReprocessService], (service: ReprocessService) => {
    expect(service).toBeTruthy();
  }));
});
