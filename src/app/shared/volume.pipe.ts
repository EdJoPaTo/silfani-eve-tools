import { Pipe, PipeTransform } from '@angular/core';

import { formatNumberShort, formatNumberDefault } from './number-functions';

@Pipe({
  name: 'volume'
})
export class VolumePipe implements PipeTransform {
  transform(value: number, short = false): string {
    if (short) {
      return formatNumberShort(value) + ' m³';
    } else {
      return formatNumberDefault(value) + ' m³';
    }
  }
}
