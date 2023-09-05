import { AfterViewInit, Component, ElementRef, Host, Input, OnChanges, OnDestroy, OnInit, Optional, Renderer2, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ClassInterface, EmbeddedProperty, isNotNil, parseFlex } from './grid.interface';
import { Subject, takeUntil } from 'rxjs';
import { GridComponent } from './grid.component';

@Component({
  selector: '[col]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./grid.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ColumComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  private classMap: { [key: string]: boolean } = {};
  private destroy$: Subject<void> = new Subject();
  hostFlexStyle: string | null = null;
  @Input() flex: string | number | null = null;
  @Input() span: string | number | null = null;
  @Input() order: string | number | null = null;
  @Input() offset: string | number | null = null;
  @Input() push: string | number | null = null;
  @Input() pull: string | number | null = null;
  @Input() xs: string | number | EmbeddedProperty | null = null;
  @Input() sm: string | number | EmbeddedProperty | null = null;
  @Input() md: string | number | EmbeddedProperty | null = null;
  @Input() lg: string | number | EmbeddedProperty | null = null;
  @Input() xl: string | number | EmbeddedProperty | null = null;
  @Input() xxl: string | number | EmbeddedProperty | null = null;
  @Input() xxxl: string | number | EmbeddedProperty | null = null;
  @Input() x4k: string | number | EmbeddedProperty | null = null;


  private get element(): HTMLElement {
    return this.host.nativeElement;
  }

  constructor(
    private host: ElementRef<HTMLElement>,
    @Optional() @Host() public gridComponent: GridComponent,
    private renderer: Renderer2
  ) {}


  ngOnInit(): void {
    this.setHostFlex();
    this.setClasses();
  }

  ngAfterViewInit(): void {
    if (this.gridComponent) {
      this.gridComponent.actualGutter$
        .pipe(takeUntil(this.destroy$))
        .subscribe(([horizontalGutter, verticalGutter]) => {
          const renderGutter = (name: string, gutter: number | null): void => {
            if (gutter !== null) {
              this.renderer.setStyle(this.element, name, `${gutter / 2}px`);
            }
          };
          renderGutter('padding-left', horizontalGutter);
          renderGutter('padding-right', horizontalGutter);
          renderGutter('padding-top', verticalGutter);
          renderGutter('padding-bottom', verticalGutter);
        });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { flex } = changes;
    if(flex) {
      this.setHostFlex();
    }
  }

  get generateColumClass(): object {
    const  listOfSize: Array<keyof ColumComponent> = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'x4k'];
    const listOfClass: ClassInterface = {};
    listOfSize.forEach((name) => {
      if(isNotNil(this[name])) {
        if(typeof this[name] === 'number' || typeof this[name] === 'string') {
          listOfClass[`col-${name}-${this[name]}`] = true;
        } else {
          const embedded = <EmbeddedProperty>this[name];
          const prefixArray: Array<keyof EmbeddedProperty> = ['span', 'pull', 'push', 'offset', 'order'];
          prefixArray.forEach(prefix => {
            const prefixClass = prefix === 'span' ? '-': `-${prefix}-`;
            listOfClass[`col-${name}${prefixClass}${embedded[prefix]}`] =
            embedded && isNotNil(embedded[prefix]);
          });
        }
      }
    });
    return listOfClass;
  }

  setClasses(): void {
    const hostClassMap = {
      ['col']: true,
      [`col-${this.span}`]: isNotNil(this.span),
      [`col-order-${this.order}`]: isNotNil(this.order),
      [`col-order-offset-${this.offset}`]: isNotNil(this.offset),
      [`col-pull-${this.pull}`]: isNotNil(this.pull),
      [`col-push-${this.push}`]: isNotNil(this.push),
      ...this.generateColumClass
    }
    for(const i in this.classMap) {
      if(this.classMap.hasOwnProperty(i)) {
        this.renderer.removeClass(this.element, i);
      }
    }
    this.classMap = { ...hostClassMap };
    for(const i in this.classMap) {
      if(this.classMap.hasOwnProperty(i) && this.classMap[i]) {
        this.renderer.addClass(this.element, i);
      }
    }
  }

  setHostFlex(): void {
    this.hostFlexStyle = parseFlex(this.flex);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete()
  }

}
