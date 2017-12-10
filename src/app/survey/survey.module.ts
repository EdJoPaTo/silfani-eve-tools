import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyComponent } from './survey.component';

import { EsiModule } from '../api/esi';
import { EveCrestModule } from '../api/eve-crest';
import { FuzzworkModule } from '../api/fuzzwork';
import { SharedModule } from '../shared';

import { ListComponent } from './list/list.component';
import { SoloTimeRemainingPipe } from './solo-time-remaining.pipe';
import { SoloTimeRemainingPrettyFormattedPipe } from './solo-time-remaining-pretty-formatted.pipe';

@NgModule({
  imports: [
    CommonModule,
    EsiModule,
    EveCrestModule,
    FuzzworkModule,
    SharedModule,
    SurveyRoutingModule
  ],
  declarations: [
    ListComponent,
    SoloTimeRemainingPipe,
    SoloTimeRemainingPrettyFormattedPipe,
    SurveyComponent
  ]
})
export class SurveyModule { }
