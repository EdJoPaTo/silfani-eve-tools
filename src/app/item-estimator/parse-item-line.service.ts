import { Injectable } from '@angular/core';

import { LineInfo } from './line-info';

const FractionNumberPart = '((?:\\d+(?:\\.\\d{3})*)(?:,\\d+)?)';
const ItemNamePart = '(\\S+(?: \\S+)*)\\*?';
const NumberPart = '(\\d+(?:\\.\\d{3})*)?';
const RangePart = '((?:\\d+(?:\\.\\d{3})*) k?m|-)';
const SeperatorPart = '(?: |\\t)+';
const PossibleSingleWordPart = '(?:\\w+' + SeperatorPart + ')?';

const BlueprintIngredientsRegex = new RegExp('^' + NumberPart + ' ?x' + SeperatorPart + ItemNamePart + '$');
const CargoScannerRegex = new RegExp('^' + NumberPart + SeperatorPart + ItemNamePart + '$');
const AmountNameRegexList: RegExp[] = [
  BlueprintIngredientsRegex,
  CargoScannerRegex
];

const ContractRegex = new RegExp('^' + ItemNamePart + SeperatorPart + NumberPart + SeperatorPart + ItemNamePart + SeperatorPart + ItemNamePart + '(?:' + SeperatorPart + ItemNamePart + ')' + '$'); // not perfect but it works for the name/ amount detection
const InventoryRegex = new RegExp('^' + ItemNamePart + SeperatorPart + NumberPart + SeperatorPart + ItemNamePart + SeperatorPart + PossibleSingleWordPart + PossibleSingleWordPart + FractionNumberPart + ' m3' + '$');
const ItemInfoReprocessedMaterialsRegex = new RegExp('^' + ItemNamePart + SeperatorPart + '\\(' + NumberPart + ' Units?\\)' + '$');
const ShipFittingChargesRegex = new RegExp('^' + ItemNamePart + ' x' + NumberPart + '$');
const SurveyScannerRegex = new RegExp('^' + ItemNamePart + SeperatorPart + NumberPart + SeperatorPart + RangePart + '$');
const NameAmountRegexList: RegExp[] = [
  ContractRegex,
  InventoryRegex,
  ItemInfoReprocessedMaterialsRegex,
  ShipFittingChargesRegex,
  SurveyScannerRegex
];

const ShipFittingShipNameRegex = new RegExp('^' + '\\[' + ItemNamePart + ', [^\\]]+\\]' + '$');

// Simple Text must be the latest regex (most general regex)
const SimpleTextRegex = new RegExp('^' + ItemNamePart + '$');
const NameRegexList: RegExp[] = [
  ShipFittingShipNameRegex,
  SimpleTextRegex
];


// special cases
const ShipFittingModuleWithCharge = new RegExp('^' + '(?!\\[)' + ItemNamePart + ', ' + ItemNamePart + '$');

@Injectable()
export class ParseItemLineService {

  constructor() { }

  parse(line: string): LineInfo[] {
    line = line.trim();
    let result;

    // Special Cases first
    if (result = ShipFittingModuleWithCharge.exec(line)) {
      let module = new LineInfo();
      module.name = result[1];
      let charge = new LineInfo();
      charge.name = result[2];
      return [module, charge];
    }

    for (let i = 0; i < AmountNameRegexList.length; i++) {
      if (result = AmountNameRegexList[i].exec(line)) {
        let li = new LineInfo();
        li.amount = Number(result[1].replace('.', ''));
        li.name = result[2];
        return [li];
      }
    }

    for (let i = 0; i < NameAmountRegexList.length; i++) {
      if (result = NameAmountRegexList[i].exec(line)) {
        let li = new LineInfo();
        if (!result[2]) {
          // Unpacked Items does not have an amount
          li.amount = 1;
        } else {
          li.amount = Number(result[2].replace('.', ''));
        }
        li.name = result[1];
        return [li];
      }
    }

    for (let i = 0; i < NameRegexList.length; i++) {
      if (result = NameRegexList[i].exec(line)) {
        let li = new LineInfo();
        li.name = result[1];
        return [li];
      }
    }

    console.warn('could not parse', line);
    return [];
  }
}
