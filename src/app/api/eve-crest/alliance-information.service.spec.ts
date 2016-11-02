/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AllianceInformationService } from './alliance-information.service';

describe('Service: AllianceInformation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllianceInformationService]
    });
  });

  it('should ...', inject([AllianceInformationService], (service: AllianceInformationService) => {
    expect(service).toBeTruthy();
  }));
});
