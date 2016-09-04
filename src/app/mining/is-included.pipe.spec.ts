/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { IsIncludedPipe } from './is-included.pipe';

describe('Pipe: IsIncluded', () => {
  it('create an instance', () => {
    let pipe = new IsIncludedPipe();
    expect(pipe).toBeTruthy();
  });
});
