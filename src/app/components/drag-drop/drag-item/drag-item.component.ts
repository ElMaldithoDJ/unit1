import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'li[drag-item], drag-item',
  templateUrl: './drag-item.html',
  styleUrls: ['./drag-item.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragItemComponent {
  @Input() value: any;
  @Input() used: number;

  constructor(private cdr: ChangeDetectorRef) {}
  
}
