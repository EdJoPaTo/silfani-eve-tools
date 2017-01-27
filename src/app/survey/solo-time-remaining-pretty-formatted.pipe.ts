import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'soloTimeRemainingPrettyFormatted'
})
export class SoloTimeRemainingPrettyFormattedPipe implements PipeTransform {

  transform(seconds: number): string {
    let dateString = '≈ ';

    if (seconds > 0) {
      const date = new Date(seconds * 1000);

      if (date.getUTCDate() > 1) {
        dateString += (date.getUTCDate() - 1) + ' ';
        dateString += 'day';
        dateString += date.getUTCDate() > 2 ? 's' : '';

        if (date.getUTCHours() > 0 || date.getUTCMinutes() > 0) {
          dateString += ' ';
        }
      }

      if (date.getUTCHours() > 0) {
        dateString += date.getUTCHours();
      }

      if (date.getUTCHours() > 0 && date.getUTCDate() === 1) {
        dateString += ':';
      }

      if (date.getUTCDate() === 1) {
        if (date.getUTCHours() > 0) {
          dateString += date.getUTCMinutes() < 10 ? '0' : '';
        }
        dateString += date.getUTCMinutes();
      }

      if (date.getUTCHours() > 0) {
        dateString += ' h';
      } else if (date.getUTCDate() === 1) {
        dateString += ' min';
      }
    } else {
      dateString += 'NaN min';
    }

    return dateString;
  }

}
