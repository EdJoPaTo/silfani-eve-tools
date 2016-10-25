import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AutocompleteService, ZKillStats, ZKillStatsService } from '../api/z-killboard';
import { Hovered } from './hovered';

@Component({
  selector: 'app-pilot-analyzer',
  templateUrl: 'pilot-analyzer.component.html',
  styleUrls: ['pilot-analyzer.component.css']
})
export class PilotAnalyzerComponent implements OnInit {
  characters: ZKillStats[] = [];
  charactersWithoutKills = 0;
  initialContent: string = 'Rell Silfani\nKarnis Delvari\n';
  nameCount: number = 0;
  private searchTerms = new Subject<string[]>();
  hovered: Hovered = new Hovered();

  constructor(
    private zKillStatsService: ZKillStatsService,
    private zKautocompleteService: AutocompleteService
  ) { }

  ngOnInit() {
    this.searchTerms
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
  }

  statsOfName(name: string): Observable<ZKillStats> {
    return this.zKautocompleteService.characterID(name)
      .map(ids => ids[0] ? ids[0] : null)
      .flatMap(id => id ? this.zKillStatsService.character(id) : Observable.of<ZKillStats>(null));
  }

  statsOfNames(names: string[]): Observable<ZKillStats>[] {
    return names.map(name => this.statsOfName(name));
  }

  search(lines: string[]) {
    this.searchTerms.next(lines);
    this.nameCount = lines.length;
  }
}
