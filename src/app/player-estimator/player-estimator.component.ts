import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { CharacterIdService } from '../api/eve-xml-api/character-id.service';
import { CharacterStats } from '../api/z-killboard/character-stats';
import { CharacterStatsService } from '../api/z-killboard/character-stats.service';
import { PlayerListComponent } from './player-list';
import { PlayerGroupListComponent } from './player-group-list';

@Component({
  selector: 'app-player-estimator',
  templateUrl: 'player-estimator.component.html',
  styleUrls: ['player-estimator.component.css'],
  directives: [PlayerGroupListComponent, PlayerListComponent],
  providers: [CharacterIdService, CharacterStatsService]
})
export class PlayerEstimatorComponent implements OnInit {
  characters: CharacterStats[] = [];
  input: string;
  private searchTerms = new Subject<string>();

  constructor(
    private characterStatsService: CharacterStatsService,
    private characterIdService: CharacterIdService
  ) { }

  ngOnInit() {
    this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .map(text => text.split('\n').filter(str => str))
      .flatMap(names => this.statsOfNames(names))
      .map(result => result.filter(char => char))
      .subscribe(result => this.characters = result as CharacterStats[]);

    this.input = 'Rell Silfani\nKarnis Delvari\n';
    this.search(this.input);
  }

  statsOfName(name: string): Observable<CharacterStats> {
    return this.characterIdService.get(name)
      .flatMap(id => id ? this.characterStatsService.get(id) : Observable.of<CharacterStats>(null));
  }

  statsOfNames(names: string[]): Observable<CharacterStats[]> {
    return Observable.forkJoin(
      names.map(name => this.statsOfName(name))
    );
  }

  search(term: string) { this.searchTerms.next(term); }

  rows(input: string): number {
    return input.split('\n').length + 4;
  }
}
