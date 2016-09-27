import { Pipe, PipeTransform } from '@angular/core';

import { ZKillStats } from '../../api/z-killboard/z-kill-stats';

@Pipe({
  name: 'anyAlliances'
})
export class AnyAlliancesPipe implements PipeTransform {

  transform(characters: ZKillStats[]): boolean {
    if (!characters) { return false; }
    return characters.some(c => c.info.allianceID > 0);
  }
}
