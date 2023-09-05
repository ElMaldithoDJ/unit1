import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewEncapsulation, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ICuestion } from './models/data.model';

@Component({
  selector: 'app-drag-drop',
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
export class DragDropComponent implements ControlValueAccessor {
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  @Input() disabled: boolean = false;

  cuestions: ICuestion[] = [
    {
      cuestion: '¿Cual es la capital de Rep. Domicana?',
      correct_aunswer: 'Santo Domingo',
      aunswer: '',
      used: 0
    }
  ];
  aunswers: string[] = [
    'Santo Domingo',
    'Barahona',
    'Cotui',
    'Higuey'
  ];

  onChangeCb: Function = (value?: any) => void 0;
  onTouchCb: Function = () => void 0;
  
  constructor(
    private cdr: ChangeDetectorRef,
  ) {}
  
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

  setAunswer(value: ICuestion): void {
    const cuestion = this.cuestions.find(item => item.cuestion === value.cuestion);
    cuestion.aunswer = value.aunswer;
    this.cdr.markForCheck();
  }

  sendValue(): void {
    const correct: number = this.cuestions.filter(item => item.aunswer === item.correct_aunswer).length * .5;
    this.value = parseInt(`${correct}`, 10);
    this.valueChange.emit(this.value);
    this.onChangeCb(this.value);
    this.cdr.markForCheck();
  }

}
