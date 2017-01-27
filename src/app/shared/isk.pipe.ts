import { Pipe, PipeTransform } from '@angular/core';

import { formatNumberShort, formatNumberDefault } from './number-functions';

@Pipe({
  name: 'isk'
})
export class IskPipe implements PipeTransform {
  transform(value: number, short = false): string {
    if (short) {
      return formatNumberShort(value) + ' ISK';
    } else {
      return formatNumberDefault(value) + ' ISK';
    }
  }
}
