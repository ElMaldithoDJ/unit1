import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IAunswer, ICuestion } from './models/data.model';
import { Subject, every } from 'rxjs';
import { shuffleItems } from './util/shuffle';
import {
  CdkDragDrop,
  CdkDragEnd,
  CdkDragEnter,
  CdkDragExit,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'drag-drop-aunswer',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DragDropComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragDropComponent implements OnInit, AfterViewInit, OnDestroy
{
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  @Input() disabled: boolean = false;
  @Input() activityTitle: string;
  isDragover: boolean = false;

  private destroy$: Subject<void> = new Subject();

  cuestions: ICuestion[] = [
    {
      date: 1960,
      correct_aunswer: 'MIT "Red Galactica"',
    },
    {
      date: 1965,
      correct_aunswer: 'Primera red de área amplia',
    },
    {
      date: 1967,
      correct_aunswer: 'Concepto ARPANET',
    },
    {
      date: 1970,
      correct_aunswer: 'Finalizó el protocolo NCP',
    },
    {
      date: 1980,
      correct_aunswer: 'Origen de HTML',
    },
    {
      date: 1990,
      correct_aunswer: 'Liberacion de internet',
    },
    {
      date: 1991,
      correct_aunswer: 'Primer documento formal de HTML',
    },
    {
      date: 1993,
      correct_aunswer: 'Propuesta para estandarizar HTML',
    },
    {
      date: 1995,
      correct_aunswer: 'El IETF organiza un grupo de trabajo de HTML',
    },
    {
      date: 1996,
      correct_aunswer: 'Se publican los estandares de HTML',
    },
  ];

  aunswersOpts: string[] = [];
  aunswers: string[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.setAunswersOpts();
  }

  ngAfterViewInit(): void {}

  onDrag(event: DragEvent): void {
    event.preventDefault();
    
  }

  dragStart(event: DragEvent): void {
    event.preventDefault();
  }

  dragEnter(): void {
    this.isDragover = true;
    this.cdr.markForCheck();
  }

  onDragEnd(event?: CdkDragEnd<ICuestion>): void {
    if (event) {
      const element = <HTMLElement>event.event.target;
      element.classList.add('drag-stop');
      event.source.reset();
      setTimeout(() => {
        element.classList.remove('drag-stop');
      }, 1500);
    }
    this.isDragover = false;
    this.cdr.markForCheck();
  }

  onDrop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const id = this.aunswersOpts.findIndex(a => a === event.item.data);
      this.aunswers = [...this.aunswers, event.item.data];
      this.aunswersOpts.splice(id, 1);
      this.cdr.markForCheck();
    }
  }

  setAunswersOpts(): void {
    const cuestions = this.cuestions.slice().map(x => x.correct_aunswer);
    this.aunswersOpts = shuffleItems(cuestions);
    this.cdr.markForCheck();
  }


  setCalification(): void {
    let c: boolean[] = [];
    for(let x = 0; x < this.cuestions.length; x++) {
      c = [...c, (this.cuestions[x].correct_aunswer === this.aunswers[x])];
    }
    const cx = (c.filter(i => i === true).length * .5);
    console.log(cx);
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
