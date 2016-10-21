import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'compressed'
})
export class CompressedPipe implements PipeTransform {

  transform(items: any[], onlyElseExclude: boolean): any[] {
    if (!items) { return []; }
    if (onlyElseExclude) {
      return items.filter(i => this.isCompressed(i));
    } else {
      return items.filter(i => !this.isCompressed(i));
    }
  }

  private isCompressed(item: any): boolean {
    return item.name.startsWith('Compressed ');
  }
}
