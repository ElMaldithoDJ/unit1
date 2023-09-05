import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Host,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ICuestion } from '../models/data.model';
import { DragDropComponent } from '../drag-drop.component';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { DragItemComponent } from '../drag-item/drag-item.component';

@Component({
  selector: 'dop-area',
  templateUrl: './drop-area.html',
  styleUrls: ['./drop-area.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropAreaComponent {
  @Output() cuestionsChange: EventEmitter<ICuestion> = new EventEmitter();

  constructor(
    private cdr: ChangeDetectorRef,
    @Host() private dradropComponent: DragDropComponent,
    private hostElement: ElementRef<HTMLElement>
  ) {}

  private get element(): HTMLElement {
    return this.hostElement.nativeElement;
  }

  onDropAunswer(dropEvent: CdkDragDrop<DragItemComponent>): void {
    const dropped_element = (<HTMLElement>dropEvent.event.target);
    const index: number = Number(`${this.element.getAttribute('data-index')}`);
    const text = dropped_element.innerText;
    this.dradropComponent.setAunswer(index, text);
    this.cdr.markForCheck();
  }
}
