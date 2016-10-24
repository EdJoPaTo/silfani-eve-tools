/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TypeIdFromNameService } from './type-id-from-name.service';

describe('Service: TypeIdFromName', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypeIdFromNameService]
    });
  });

  it('should ...', inject([TypeIdFromNameService], (service: TypeIdFromNameService) => {
    expect(service).toBeTruthy();
  }));
});
