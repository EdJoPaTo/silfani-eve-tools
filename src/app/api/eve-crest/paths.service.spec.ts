/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PathsService } from './paths.service';

describe('Service: Paths', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PathsService]
    });
  });

  it('should ...', inject([PathsService], (service: PathsService) => {
    expect(service).toBeTruthy();
  }));
});
