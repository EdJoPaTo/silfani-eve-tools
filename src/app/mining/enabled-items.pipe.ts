import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enabledItems',
  pure: false
})
export class EnabledItemsPipe implements PipeTransform {

  transform(allItems: any, enabled: any): any {
    if (!allItems || !enabled) { return []; }
    let ids = Object.keys(allItems);
    let filteredIds = ids.filter(i => enabled[i]);
    return filteredIds.reduce((all, cur) => all.concat(allItems[cur]), []);
  }

}
