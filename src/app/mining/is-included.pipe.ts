import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isIncluded'
})
export class IsIncludedPipe implements PipeTransform {

  transform(items: any[], included: any): any[] {
    console.log('IsIncludedPipe', items, included);
    if (!items) { return []; }

    let ids = Object.keys(items);
    let filtered = ids.filter(i => included[i]);

    console.log('included:', filtered);
    return [];
  }

}
