/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { CompressedPipe } from './compressed.pipe';

describe('Pipe: Compressed', () => {
  it('create an instance', () => {
    let pipe = new CompressedPipe();
    expect(pipe).toBeTruthy();
  });
});
