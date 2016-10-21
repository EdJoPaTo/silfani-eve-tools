import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IskPipe } from './isk.pipe';
import { ShortnumberPipe } from './shortnumber.pipe';
import { VolumePipe } from './volume.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    IskPipe,
    ShortnumberPipe,
    VolumePipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    IskPipe,
    ShortnumberPipe,
    VolumePipe
  ]
})
export class SharedModule { }
