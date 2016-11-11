import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AutocompleteHit, AutocompleteService, ZKillStats, ZKillStatsService } from '../api/z-killboard';
import { Hovered } from './hovered';

@Component({
  selector: 'app-pilot-analyzer',
  templateUrl: 'pilot-analyzer.component.html',
  styleUrls: ['pilot-analyzer.component.css']
})
export class PilotAnalyzerComponent implements OnInit {
  characters: Observable<AutocompleteHit[]>;
  characterStats: Observable<ZKillStats[]>;
  charactersWithoutKills: Observable<string[]>;
  charactersWithoutKillsCount: Observable<number>;
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
    this.characters = this.searchTerms
      .map(lines => { this.nameCount = lines.length; this.idCurrent = 0; this.statsCurrent = 0; return lines; })
      .switchMap(names => Observable.from(names)
        .flatMap(name => this.zKautocompleteService.character(name)
          .map(hits => hits[0] ? hits[0] : { id: 0, name: name, type: 'unknown', image: 'Character/0_32.jpg' }))
        .map(s => { this.idCurrent++; return s; })
        .reduce((cur, add) => cur.concat(add), [])
      )
      .catch(err => { this.error = 'zKillboard autocomplete API failed'; return Observable.of<AutocompleteHit[]>([]); })
      .map(ids => { if (ids.length > 0) { this.error = ''; } return ids; })
      .share();

    this.characterStats = this.characters
      .map(s => { this.statsCurrent = 0; return s; })
      .map(hits => hits.map(hit => hit.id))
      .switchMap(ids => Observable.from(ids)
        .filter(id => id ? true : false)
        .flatMap(id => this.zKillStatsService.character(id))
        .map(s => { this.statsCurrent++; return s; })
        .reduce((cur, add) => cur.concat(add), [])
      )
      .catch(err => { this.error = 'zKillboard Statistics API failed'; return Observable.of<ZKillStats[]>([]); })
      .map(ids => { if (ids.length > 0) { this.error = ''; } return ids; })
      .share();

    this.charactersWithoutKills = this.characters
      .map(hits => hits.filter(hit => !hit.id))
      .map(hits => hits.map(hit => hit.name))
      .share();

    this.charactersWithoutKillsCount = this.charactersWithoutKills
      .map(names => names.length)
      .share();
  }

  search(lines: string[]) {
    this.searchTerms.next(lines);
  }
}
