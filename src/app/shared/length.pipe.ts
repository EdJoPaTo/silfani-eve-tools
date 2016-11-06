import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'length'
})
export class LengthPipe implements PipeTransform {

  transform(value: any): any {
    if (!value) {return 0; }
    return value.length;
  }

}
