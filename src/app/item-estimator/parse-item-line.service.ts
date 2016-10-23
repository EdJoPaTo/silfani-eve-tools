import { Injectable } from '@angular/core';

import { LineInfo } from './line-info';

@Injectable()
export class ParseItemLineService {

  constructor() { }

  parse(line: string): LineInfo {
    let li = new LineInfo();
    li.name = 'Veldspar';
    // li.amount = 1;

    console.log('ParseItemLineService', line, li);
    return li;
  }

}
