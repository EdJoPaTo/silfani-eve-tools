import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-clipboard-paste-textarea',
  templateUrl: './clipboard-paste-textarea.component.html',
  styleUrls: ['./clipboard-paste-textarea.component.scss']
})
export class ClipboardPasteTextareaComponent implements OnInit {
  @Input() initialContent: string = '';
  @Input() placeholder: string = 'paste stuff here';
  @Output() changed = new EventEmitter();
  private search = new Subject<string>();
  private input: string = '';

  constructor() { }

  ngOnInit() {
    this.search
      .debounceTime(300) // wait for 300ms pause in events
      .distinctUntilChanged() // ignore if next search term is same as previous
      .map(text => text.split('\n').filter(str => str))
      .subscribe(content => {
        this.changed.emit(content);
      });

    if (this.initialContent) {
      this.input = this.initialContent;
      this.search.next(this.input);
    }
  }
}
