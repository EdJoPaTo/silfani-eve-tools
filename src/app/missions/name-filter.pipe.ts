import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {

  transform(missions: any[], term: string): any[] {
    if (!missions && !missions.length) { return []; }
    let myTerm = term.toLowerCase();
    return missions.filter(m => this.isMissionBasedOnTerm(m, myTerm));
  }

  private isMissionBasedOnTerm(mission: any, term: string): boolean {
    if (mission.name.en.toLowerCase().indexOf(term) >= 0) {
      return true;
    }
    if (mission.name.de.toLowerCase().indexOf(term) >= 0) {
      return true;
    }
    return false;
  }
}
