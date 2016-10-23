import { Injectable } from '@angular/core';

import { LineInfo } from './line-info';

@Injectable()
export class ParseItemLineService {

  constructor() { }

  parse(line: string): LineInfo[] {
    line = line.trim();

    let li = new LineInfo();
    li.name = 'Veldspar';

    return [li];
  }

}
