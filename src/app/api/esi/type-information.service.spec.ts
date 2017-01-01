/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TypeInformationService } from './type-information.service';

describe('TypeInformationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypeInformationService]
    });
  });

  it('should ...', inject([TypeInformationService], (service: TypeInformationService) => {
    expect(service).toBeTruthy();
  }));
});
