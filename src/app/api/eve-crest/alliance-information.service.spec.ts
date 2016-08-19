/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { AllianceInformationService } from './alliance-information.service';

describe('Service: AllianceInformation', () => {
  beforeEach(() => {
    addProviders([AllianceInformationService]);
  });

  it('should ...',
    inject([AllianceInformationService],
      (service: AllianceInformationService) => {
        expect(service).toBeTruthy();
      }));
});
