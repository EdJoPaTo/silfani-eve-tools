import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AutocompleteService } from '../api/z-killboard/autocomplete.service';
import { ZKillStats } from '../api/z-killboard/z-kill-stats';
import { ZKillStatsService } from '../api/z-killboard/z-kill-stats.service';
import { AllianceInformationService } from '../api/eve-crest/alliance-information.service';
import { Hovered } from './hovered';
import { PilotListComponent } from './pilot-list';
import { PilotGroupListComponent } from './pilot-group-list';

@Component({
  selector: 'app-pilot-analyzer',
  templateUrl: 'pilot-analyzer.component.html',
  styleUrls: ['pilot-analyzer.component.css'],
  directives: [PilotGroupListComponent, PilotListComponent],
  providers: [AutocompleteService, ZKillStatsService, AllianceInformationService]
})
export class PilotAnalyzerComponent implements OnInit {
  characters: ZKillStats[] = [];
  input: string;
  private searchTerms = new Subject<string>();
  hovered: Hovered = new Hovered();

  constructor(
    private zKillStatsService: ZKillStatsService,
    private zKautocompleteService: AutocompleteService
  ) { }

  ngOnInit() {
    this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .map(text => text.split('\n').filter(str => str))
      .flatMap(names => this.statsOfNames(names))
      .map(result => result.filter(char => char))
      .subscribe(result => this.characters = result as ZKillStats[]);

    this.input = 'Rell Silfani\nKarnis Delvari\n';
    this.search(this.input);
  }

  statsOfName(name: string): Observable<ZKillStats> {
    return this.zKautocompleteService.characterID(name)
      .map(ids => ids[0] ? ids[0] : null)
      .flatMap(id => id ? this.zKillStatsService.character(id) : Observable.of<ZKillStats>(null));
  }

  statsOfNames(names: string[]): Observable<ZKillStats[]> {
    return Observable.forkJoin(
      names.map(name => this.statsOfName(name))
    ) as Observable<ZKillStats[]>;
  }

  search(term: string) { this.searchTerms.next(term); }
}
