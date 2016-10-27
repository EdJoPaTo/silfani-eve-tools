import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-characters-without-kills-hint',
  templateUrl: './characters-without-kills-hint.component.html',
  styleUrls: ['./characters-without-kills-hint.component.scss']
})
export class CharactersWithoutKillsHintComponent implements OnInit {
  @Input() charactersWithoutKills: number;

  constructor() { }

  ngOnInit() {
  }

}
