import { Component, Host, ViewEncapsulation } from '@angular/core';
import { DragDropComponent } from '../drag-drop.component';
import { IAunswer, ICuestion } from '../models/data.model';
import { shuffleItems } from '../util/shuffle';

@Component({
  selector: 'drag-list',
  templateUrl: './drag-list.html',
  styleUrls: ['./drag-list.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DragListComponent {
  constructor(@Host() private dragDropParent: DragDropComponent) {}

  get cuestions(): ICuestion[] {
    return this.dragDropParent.cuestions;
  }

  get aunswers(): IAunswer[] {
    let _aunsers: IAunswer[] = [];
    this.cuestions.forEach((item: ICuestion, index: number) => {
      _aunsers = [
        ..._aunsers,
        {
          aunswer: item.correct_aunswer,
          used: this.responseTimes[index],
        },
      ];
    });
    return shuffleItems(_aunsers);
  }

  get responseTimes(): number[] {
    let times: number[] = [];
    for (let i = 0; i < this.aunswers.length; i++) {
      times = [
        ...times,
        this.cuestions.filter((item) => item.aunswer === this.aunswers[i]).length,
      ];
    }
    return times;
  }
}
