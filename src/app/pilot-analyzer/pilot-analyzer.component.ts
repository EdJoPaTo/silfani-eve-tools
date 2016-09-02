import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AutocompleteService } from '../api/z-killboard/autocomplete.service';
import { ZKillStats } from '../api/z-killboard/z-kill-stats';
import { ZKillStatsService } from '../api/z-killboard/z-kill-stats.service';
import { AllianceInformationService } from '../api/eve-crest/alliance-information.service';
import { Hovered } from './hovered';
import { DestroyedLostComponent } from './destroyed-lost';
import { PilotListComponent } from './pilot-list';
import { PilotGroupListComponent } from './pilot-group-list';

@Component({
  selector: 'app-pilot-analyzer',
  templateUrl: 'pilot-analyzer.component.html',
  styleUrls: ['pilot-analyzer.component.css'],
  directives: [
    DestroyedLostComponent,
    PilotGroupListComponent,
    PilotListComponent
  ],
  providers: [AutocompleteService, ZKillStatsService, AllianceInformationService]
})
export class PilotAnalyzerComponent implements OnInit {
  characters: ZKillStats[] = [];
  charactersWithoutKills = 0;
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
      .map(this.namesOfInput)
      .subscribe(names => {
        let clear = true;
        Observable.of<string[]>(names)
          .flatMap(a => this.statsOfNames(a))
          .flatMap(a => a)
          .subscribe(stats => {
            if (clear) {
              clear = false;
              this.characters = [];
              this.charactersWithoutKills = 0;
            }
            if (stats) {
              this.characters = this.characters.concat([stats]);
            } else {
              this.charactersWithoutKills++;
            }
          }
          );
      });

    this.input = 'Rell Silfani\nKarnis Delvari\n';
    this.search(this.input);
  }

  namesOfInput(input: string): string[] {
    return input.split('\n').filter(str => str);
  }

  statsOfName(name: string): Observable<ZKillStats> {
    return this.zKautocompleteService.characterID(name)
      .map(ids => ids[0] ? ids[0] : null)
      .flatMap(id => id ? this.zKillStatsService.character(id) : Observable.of<ZKillStats>(null));
  }

  statsOfNames(names: string[]): Observable<ZKillStats>[] {
    return names.map(name => this.statsOfName(name));
  }

  search(term: string) { this.searchTerms.next(term); }
}
