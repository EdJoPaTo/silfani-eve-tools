import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyComponent } from './survey.component';

import { EveCrestModule } from '../api/eve-crest';
import { FuzzworkModule } from '../api/fuzzwork';
import { SharedModule } from '../shared';

import { ListComponent } from './list/list.component';
import { SoloTimeRemainingPipe } from './solo-time-remaining.pipe';
import { SoloTimeRemainingPrettyFormattedPipe } from './solo-time-remaining-pretty-formatted.pipe';
import { SurveyScannerEntryPipe } from './survey-scanner-entry.pipe';

@NgModule({
  imports: [
    CommonModule,
    EveCrestModule,
    FuzzworkModule,
    SharedModule,
    SurveyRoutingModule
  ],
  declarations: [
    ListComponent,
    SoloTimeRemainingPipe,
    SoloTimeRemainingPrettyFormattedPipe,
    SurveyComponent,
    SurveyScannerEntryPipe
  ]
})
export class SurveyModule { }
