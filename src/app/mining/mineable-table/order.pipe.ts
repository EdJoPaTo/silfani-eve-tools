import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'order'
})
export class OrderPipe implements PipeTransform {

  transform(items: any, prices: any, itemTypes: any, volume: number, orderBy: string, orderDirectionIsDefault = true, isSell = false): any {
    switch (orderBy) {
      case 'name':
        return this.orderWith(items, i => i.name.toUpperCase(), orderDirectionIsDefault ? true : false);
      case 'singleprice':
        return this.orderWith(items, i => this.getPrice(i, prices, isSell), orderDirectionIsDefault ? false : true);
      case 'cycleamount':
        return this.orderWith(items, i => this.getCycleAmount(i, itemTypes, volume), orderDirectionIsDefault ? true : false);
      case 'cycleprice':
        return this.orderWith(items, i => this.getCyclePrice(i, itemTypes, volume, prices, isSell), orderDirectionIsDefault ? false : true);
      default:
        console.error('dont know how to sort by', orderBy);
        return items;
    }
  }

  private getPrice(item: any, prices: any, isSell: boolean) {
    if (!prices) { return 0; }
    let id = item.id;
    if (!prices[id]) { return 0; }

    let singlePrice = isSell ? prices[id].sell.percentile : prices[id].buy.percentile;

    return singlePrice;
  }

  private getCycleAmount(item: any, itemTypes: any, volume: number) {
    let itemType = itemTypes[item.id];
    let itemVolume = itemType ? itemType.volume : 0;

    let amount = volume / itemVolume;

    return amount;
  }

  private getCyclePrice(item: any, itemTypes: any, volume: number, prices: any, isSell: boolean) {
    let singlePrice = this.getPrice(item, prices, isSell);
    let amount = this.getCycleAmount(item, itemTypes, volume);

    return singlePrice * amount;
  }

  private orderWith(items: any[], func, ascending: boolean) {
    items.sort((a, b) => {
      let cmp = ascending ? func(a) > func(b) : func(a) < func(b);
      return cmp ? 1 : -1;
    });
    return items;
  }

}
