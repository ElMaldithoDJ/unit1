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
export class DragDropComponent
  implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy
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

  onChangeCb: Function = (value?: any) => void 0;
  onTouchCb: Function = () => void 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.setAunswersOpts();
  }

  ngAfterViewInit(): void {}

  writeValue(obj: any): void {
    this.value = obj;
    this.valueChange.emit(this.value);
  }
  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchCb = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  setAunswer(index: number, aunswer: string): void {
    this.cuestions[index].aunswer = aunswer;
    this.cdr.markForCheck();
    this.onChangeCb(this.value);
  }

  sendValue(): void {
    const correct: number =
    this.cuestions.filter((item) => item.correct === true).length * 0.5;
    this.value = parseInt(`${correct}`, 10);
    this.valueChange.emit(this.value);
    this.onChangeCb(this.value);
    this.cdr.markForCheck();
  }

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
    if(event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        this.aunswers,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  setAunswersOpts(): void {
    const cuestions = this.cuestions.map(val => val.correct_aunswer).slice();
    this.aunswersOpts = shuffleItems(cuestions);
    this.cdr.markForCheck();
  }


  setCalification(): void {
    let c: boolean[] = [];
    for(let x = 0; x < this.cuestions.length; x++) {
      c = [...c, (this.cuestions[x].correct_aunswer === this.aunswers[x])];
    }
    const cx = (c.filter(i => i === true).length * .5);
    this.cdr.markForCheck();
    console.log(cx);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
