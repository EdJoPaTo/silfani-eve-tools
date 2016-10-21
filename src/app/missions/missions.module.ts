import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MissionsRoutingModule } from './missions-routing.module';
import { MissionsComponent } from './missions.component';

import { DetailedinfoPipe } from './detailedinfo.pipe';
import { InfoiconPipe } from './infoicon.pipe';
import { InfotitlePipe } from './infotitle.pipe';
import { LevelFilterPipe } from './level-filter.pipe';
import { MissionListComponent } from './mission-list';
import { NameFilterPipe } from './name-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MissionsRoutingModule
  ],
  declarations: [
    MissionsComponent,
    DetailedinfoPipe,
    InfoiconPipe,
    InfotitlePipe,
    LevelFilterPipe,
    MissionListComponent,
    NameFilterPipe
  ]
})
export class MissionsModule { }
