import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClipboardPasteTextareaComponent } from './clipboard-paste-textarea/clipboard-paste-textarea.component';
import { IskPipe } from './isk.pipe';
import { ShortnumberPipe } from './shortnumber.pipe';
import { VolumePipe } from './volume.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ClipboardPasteTextareaComponent,
    IskPipe,
    ShortnumberPipe,
    VolumePipe
  ],
  exports: [
    CommonModule,
    ClipboardPasteTextareaComponent,
    FormsModule,
    IskPipe,
    ShortnumberPipe,
    VolumePipe
  ]
})
export class SharedModule { }
