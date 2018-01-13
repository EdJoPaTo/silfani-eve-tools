import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { SearchService } from '../api/esi';
import { ZKillStats, ZKillStatsService } from '../api/z-killboard';
import { Hovered } from './hovered';

@Component({
  selector: 'app-pilot-analyzer',
  templateUrl: './pilot-analyzer.component.html',
  styleUrls: ['./pilot-analyzer.component.css']
})
export class PilotAnalyzerComponent implements OnInit {
  characterIDs: Observable<number[]>;
  characterStats: Observable<ZKillStats[]>;
  charactersWithoutKills: Observable<string[]>;
  error: string;
  initialContent: string = 'Rell Silfani\nKarnis Delvari\n';
  nameCount: number = 0;
  idCount: number = 0;
  private searchTerms = new Subject<string[]>();
  hovered: Hovered = new Hovered();
  idCurrent: number = 0;
  statsCurrent: number = 0;

  constructor(
    private searchService: SearchService,
    private zKillStatsService: ZKillStatsService
  ) { }

  ngOnInit() {
    this.characterIDs = this.searchTerms
      .map(lines => { this.nameCount = lines.length; this.idCurrent = 0; this.statsCurrent = 0; return lines; })
      .switchMap(names => Observable.from(names)
        .flatMap(name => this.searchService.character(name, true))
        .map(s => { this.idCurrent++; return s; })
        .reduce((cur, add) => cur.concat(add), [])
      )
      .catch(err => { this.error = 'ESI search API failed'; return Observable.of<number[]>([]); })
      .map(ids => { if (ids.length > 0) { this.error = ''; } return ids; })
      .share();

    this.characterStats = this.characterIDs
      .map(ids => { this.idCount = ids.length; this.statsCurrent = 0; return ids; })
      .switchMap(ids => Observable.from(ids)
        .flatMap(id => this.zKillStatsService.character(id))
        .map(s => { this.statsCurrent++; return s; })
        .filter(o => o != null)
        .reduce((cur, add) => cur.concat(add), [])
      )
      .catch(err => { this.error = 'zKillboard Statistics API failed'; return Observable.of<ZKillStats[]>([]); })
      .map(ids => { if (ids.length > 0) { this.error = ''; } return ids; })
      .share();

    // TODO
    this.charactersWithoutKills = Observable.of([])
      .share();
  }

  search(lines: string[]) {
    this.searchTerms.next(lines);
  }
}
