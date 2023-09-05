import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output, ViewEncapsulation, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ICuestion } from './models/data.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'drag-drop-aunswer',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DragDropComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DragDropComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  @Input() disabled: boolean = false;
  @Input() activityTitle: string;

  private destroy$: Subject<void> = new Subject();

  cuestions: ICuestion[] = [
    {
      cuestion: '¿Cual es la capital de Rep. Domicana?',
      correct: false,
      correct_aunswer: 'Santo Domingo',
      aunswer: '',
      used: 0
    },
    {
      cuestion: '¿Cuantos anños tienes?',
      correct: false,
      correct_aunswer: '20',
      aunswer: '',
      used: 0
    },
  ];

  onChangeCb: Function = (value?: any) => void 0;
  onTouchCb: Function = () => void 0;
  
  constructor(
    private cdr: ChangeDetectorRef,
  ) {}

  ngAfterViewInit(): void {

  }
  
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
    const correct: number = this.cuestions.filter(item => item.correct === true).length * .5;
    this.value = parseInt(`${correct}`, 10);
    this.valueChange.emit(this.value);
    this.onChangeCb(this.value);
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
