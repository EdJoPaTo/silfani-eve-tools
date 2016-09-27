/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ItemTypesService } from './item-types.service';

describe('Service: ItemTypes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemTypesService]
    });
  });

  it('should ...', inject([ItemTypesService], (service: ItemTypesService) => {
    expect(service).toBeTruthy();
  }));
});
