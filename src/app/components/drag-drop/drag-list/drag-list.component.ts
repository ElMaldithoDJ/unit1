import { Component, Host, Input, ViewEncapsulation } from '@angular/core';
import { DragDropComponent } from '../drag-drop.component';
import { ICuestion } from '../models/data.model';

@Component({
  selector: 'drag-list',
  template: '',
  styleUrls: ['./drag-list.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DragListComponent {
  @Input() aunswers: string[];

  constructor(@Host() private dragDropParent: DragDropComponent) {}

  get cuestions(): ICuestion[] {
    return this.dragDropParent.cuestions;
  }

  get responseTimes(): number[] {
    let times: number[] = [];
    for (const i in this.aunswers) {
      times = [
        ...times,
        this.cuestions.filter((item) => item.aunswer === i).length,
      ];
    }
    return times;
  }
}
