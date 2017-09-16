import { Pipe, PipeTransform } from '@angular/core';

import { SurveyScannerEntry } from './survey-scanner-entry';

const SURVEY_SCANNER_REGEX = /(.+)\s+([,\d]+)\s+([,\d]+) m3\s+([,\d]+ k?)m/;

@Pipe({
  name: 'surveyScannerEntry'
})
export class SurveyScannerEntryPipe implements PipeTransform {

  transform(lines: string[]): SurveyScannerEntry[] {
    if (!lines) { return []; }

    return lines
      .map(line => this.transformLine(line))
      .filter(entry => entry ? true : false);
  }

  transformLine(line: string): SurveyScannerEntry {
    const match = SURVEY_SCANNER_REGEX.exec(line);

    if (!match) { return null; }
    const entry = new SurveyScannerEntry;

    entry.name = match[1].trim();
    entry.amount = Number(match[2].replace(/,/g, ''));
    entry.volume = Number(match[3].replace(/,/g, ''));
    entry.distance = Number(match[4].replace(/,/g, '').replace(/ /g, '').replace('k', '000'));

    return entry;
  }

}
