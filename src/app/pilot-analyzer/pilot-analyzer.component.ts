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
  characterIds: Observable<number[]>;
  characterStats: Observable<ZKillStats[]>;
  charactersWithoutKills: Observable<number>;
  initialContent: string = 'Rell Silfani\nKarnis Delvari\n';
  nameCount: number = 0;
  private searchTerms = new Subject<string[]>();
  hovered: Hovered = new Hovered();

  constructor(
    private zKillStatsService: ZKillStatsService,
    private zKautocompleteService: AutocompleteService
  ) { }

  ngOnInit() {
    this.characterIds = this.searchTerms
      .switchMap(names => Observable.from(names)
        .flatMap(name => this.zKautocompleteService.characterID(name))
        .map(ids => ids[0])
        .filter(id => id)
        .reduce((cur, add) => cur.concat(add), [])
      )
      .share();

    this.characterStats = this.characterIds
      .switchMap(ids => Observable.from(ids)
        .flatMap(id => this.zKillStatsService.character(id))
        .reduce((cur, add) => cur.concat(add), [])
      )
      .share();

    this.charactersWithoutKills = this.characterIds
      .map(ids => this.nameCount - ids.length)
      .share();
  }

  search(lines: string[]) {
    this.searchTerms.next(lines);
    this.nameCount = lines.length;
  }
}
