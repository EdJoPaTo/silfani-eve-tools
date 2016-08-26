import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AutocompleteService } from '../api/z-killboard/autocomplete.service';
import { CharacterStats } from '../api/z-killboard/character-stats';
import { CharacterStatsService } from '../api/z-killboard/character-stats.service';
import { AllianceInformationService } from '../api/eve-crest/alliance-information.service';
import { Hovered } from './hovered';
import { PilotListComponent } from './pilot-list';
import { PlayerGroupListComponent } from './player-group-list';

@Component({
  selector: 'app-player-estimator',
  templateUrl: 'player-estimator.component.html',
  styleUrls: ['player-estimator.component.css'],
  directives: [PlayerGroupListComponent, PilotListComponent],
  providers: [AutocompleteService, CharacterStatsService, AllianceInformationService]
})
export class PlayerEstimatorComponent implements OnInit {
  characters: CharacterStats[] = [];
  input: string;
  private searchTerms = new Subject<string>();
  hovered: Hovered = new Hovered();

  constructor(
    private characterStatsService: CharacterStatsService,
    private zKautocompleteService: AutocompleteService
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
    return this.zKautocompleteService.characterID(name)
      .map(ids => ids[0] ? ids[0] : null)
      .flatMap(id => id ? this.characterStatsService.get(id) : Observable.of<CharacterStats>(null));
  }

  statsOfNames(names: string[]): Observable<CharacterStats[]> {
    return Observable.forkJoin(
      names.map(name => this.statsOfName(name))
    );
  }

  search(term: string) { this.searchTerms.next(term); }
}
