/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { LengthPipe } from './length.pipe';

describe('Pipe: Length', () => {
  it('create an instance', () => {
    let pipe = new LengthPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns null as length 0', () => {
    let pipe = new LengthPipe();
    expect(pipe.transform(null)).toBe(0);
  });

  it('returns [] as length 0', () => {
    let pipe = new LengthPipe();
    expect(pipe.transform([])).toBe(0);
  });

  it('returns [muh, kuh, stuff] as length 3', () => {
    let pipe = new LengthPipe();
    expect(pipe.transform(['muh', 'kuh', 'stuff'])).toBe(3);
  });
});
