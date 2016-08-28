import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'infoicon'
})
export class InfoiconPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return null;
    }

    if (value.alli) {
      return '//imageserver.eveonline.com/Alliance/' + value.alli + '_128.png';
    }

    if (value.corp) {
      return '//imageserver.eveonline.com/Corporation/' + value.corp + '_256.png';
    }

    if (value.item) {
      return '//imageserver.eveonline.com/Type/' + value.item + '_64.png';
    }

    return null;
  }

}
