import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'soloTimeRemaining'
})
export class SoloTimeRemainingPipe implements PipeTransform {

  transform(totalVolume: number, amount: number, cycletime: number, miners: number): number {
    const a = totalVolume / amount;
    const b = cycletime / miners;
    const seconds = a * b;

    return seconds;
  }
}
