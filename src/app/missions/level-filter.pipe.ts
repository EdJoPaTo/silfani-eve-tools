import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'levelFilter'
})
export class LevelFilterPipe implements PipeTransform {

  transform(missions: any[], levelEnabledArray: boolean[]): any[] {
    if (!missions && !missions.length) { return []; }
    return missions.filter(m => this.isMissionIncluded(m, levelEnabledArray));
  }

  private isMissionIncluded(mission: any, levelEnabledArray: boolean[]): boolean {
    if (!mission.level) { return true; } // Include Blitz Missions
    const levels = Object.keys(mission.level).map(num => Number.parseInt(num));
    if (levels.length === 0) { return true; } // Include Blitz Missions
    for (const level of levels) {
      const isLevelEnabled = levelEnabledArray[level - 1];
      if (isLevelEnabled) {
        return true;
      }
    }

    return false;
  }
}
