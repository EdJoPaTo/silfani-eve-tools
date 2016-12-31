import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

function onlyUnique(value, index, self): boolean {
  return self.indexOf(value) === index;
}

@Component({
  selector: 'app-clipboard-paste-textarea',
  templateUrl: './clipboard-paste-textarea.component.html',
  styleUrls: ['./clipboard-paste-textarea.component.scss']
})
export class ClipboardPasteTextareaComponent implements OnInit {
  @Input() initialContent: string = '';
  @Input() placeholder: string = 'paste stuff here';
  @Input() distinctLines: boolean = false;
  @Output() changed = new EventEmitter();
  search = new Subject<string>();
  input: string = '';

  constructor() { }

  ngOnInit() {
    this.search
      .debounceTime(300) // wait for 300ms pause in events
      .distinctUntilChanged() // ignore if next search term is same as previous
      .map(text => text.split('\n').filter(str => str))
      .map(lines => this.distinctLines ? lines.filter(onlyUnique) : lines)
      .subscribe(content => {
        this.changed.emit(content);
      });

    if (this.initialContent) {
      this.input = this.initialContent;
      this.search.next(this.input);
    }
  }
}
