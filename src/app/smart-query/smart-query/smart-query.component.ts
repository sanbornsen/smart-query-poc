import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-smart-query',
  templateUrl: './smart-query.component.html',
  styleUrls: ['./smart-query.component.css']
})
export class SmartQueryComponent implements OnInit {
  @ViewChild('search') searchField: any;

  public results: string[] = [];

  constructor() { }

  ngOnInit() {
  }

  onKeyPress(event) {
    console.log('On keypress - ', event);
  }

  onClick(event) {
    console.log(
      'On click - ',
      this.getTextTillCurrentCursor()
    );
  }

  // Handle arrow keys
  onKeyUpArrows(event) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Meta'].indexOf(event.key) > -1) {
      console.log(
        'On arrow - ',
        this.getTextTillCurrentCursor()
      );
    }
  }


  private getTextTillCurrentCursor() {
    return this.searchField.nativeElement.value.slice(0, this.searchField.nativeElement.selectionStart);
  }

}
