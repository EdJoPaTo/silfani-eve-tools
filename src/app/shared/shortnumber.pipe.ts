import { Pipe, PipeTransform } from '@angular/core';

import { formatNumberShort } from './number-functions';

@Pipe({
  name: 'shortnumber'
})
export class ShortnumberPipe implements PipeTransform {

  transform(value: number, isInteger = false): string {
    return formatNumberShort(value, isInteger);
  }

}
