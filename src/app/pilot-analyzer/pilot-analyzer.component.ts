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
  error: string;
  initialContent: string = 'Rell Silfani\nKarnis Delvari\n';
  nameCount: number = 0;
  private searchTerms = new Subject<string[]>();
  hovered: Hovered = new Hovered();
  idCurrent: number = 0;
  statsCurrent: number = 0;

  constructor(
    private zKillStatsService: ZKillStatsService,
    private zKautocompleteService: AutocompleteService
  ) { }

  ngOnInit() {
    this.characterIds = this.searchTerms
      .map(lines => { this.nameCount = lines.length; this.idCurrent = 0; this.statsCurrent = 0; return lines; })
      .switchMap(names => Observable.from(names)
        .flatMap(name => this.zKautocompleteService.characterID(name))
        .map(ids => ids[0])
        .map(s => { this.idCurrent++; return s; })
        .filter(id => id)
        .reduce((cur, add) => cur.concat(add), [])
      )
      .catch(err => { this.error = 'zKillboard autocomplete API failed'; return Observable.of<number[]>([]); })
      .map(ids => { if (ids.length > 0) { this.error = ''; } return ids; })
      .share();

    this.characterStats = this.characterIds
      .map(s => { this.statsCurrent = 0; return s; })
      .switchMap(ids => Observable.from(ids)
        .flatMap(id => this.zKillStatsService.character(id))
        .map(s => { this.statsCurrent++; return s; })
        .reduce((cur, add) => cur.concat(add), [])
      )
      .catch(err => { this.error = 'zKillboard Statistics API failed'; return Observable.of<ZKillStats[]>([]); })
      .map(ids => { if (ids.length > 0) { this.error = ''; } return ids; })
      .share();

    this.charactersWithoutKills = this.characterIds
      .map(ids => this.nameCount - ids.length)
      .share();
  }

  search(lines: string[]) {
    this.searchTerms.next(lines);
  }
}
