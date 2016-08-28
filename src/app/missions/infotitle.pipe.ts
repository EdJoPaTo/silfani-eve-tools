import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'infotitle'
})
export class InfotitlePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.name;
  }

}
