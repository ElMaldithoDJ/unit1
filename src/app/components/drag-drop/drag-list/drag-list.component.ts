import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Host,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ICuestion } from '../models/data.model';
import { shuffleItems } from '../util/shuffle';
import { DragDropComponent } from '../drag-drop.component';
import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
  selector: 'drag-list',
  templateUrl: './drag-list.html',
  styleUrls: ['./drag-list.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragListComponent implements OnInit {
  aunswers: ICuestion[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    @Host() private dragHost: DragDropComponent
  ) {}

  ngOnInit(): void {
    this.setAunswers();
  }

  onDragEnd(event: CdkDragEnd<HTMLElement>): void {
    event.source.reset();
    event.source.element.nativeElement.classList.add('cdk-drag-stop');
    setTimeout(() => {
      event.source.element.nativeElement.classList.remove('cdk-drag-stop');
    }, 550);
    this.cdr.markForCheck();
  }

  setAunswers(): void {
    let content = this.dragHost.cuestions.slice();
    this.aunswers = shuffleItems(content);
    this.cdr.markForCheck();
  }
}
