import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';
import {
  BreakpointKey,
  IndexableObject,
  alignType,
  gridResponsiveMap,
  justifyType,
} from './grid.interface';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { GridService } from './grid.service';

@Component({
  selector: '[row]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./grid.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'grid-row',
  },
})
export class GridComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() align: alignType | null;
  @Input() justify: justifyType | null;
  @Input() gutter:
    | string
    | number
    | IndexableObject
    | [number, number]
    | [IndexableObject, IndexableObject]
    | null = null;

  readonly actualGutter$: ReplaySubject<[number | null, number | null]> =
    new ReplaySubject<[number | null, number | null]>(1);

  private readonly destroy$: Subject<void> = new Subject();

  private element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  constructor(
    public elementRef: ElementRef<HTMLElement>,
    public renderer: Renderer2,
    public mediaMatcher: MediaMatcher,
    public ngZone: NgZone,
    public platform: Platform,
    private breakPointService: GridService
  ) {}

  ngOnInit(): void {
    this.setGutterStyle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { gutter } = changes;
    if (gutter) {
      this.setGutterStyle();
    }
  }

  ngAfterViewInit(): void {
    if (this.platform.isBrowser) {
      this.breakPointService
        .subscribe(gridResponsiveMap)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.setGutterStyle();
        });
    }
  }

  get getGutter(): [number | null, number | null] {
    const result: [number | null, number | null] = [null, null];
    const gutter = this.gutter || 0;
    const normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, null];
    normalizedGutter.forEach((g, index) => {
      if (typeof g === 'object' && g !== null) {
        result[index] = null;
        Object.keys(gridResponsiveMap).map((screen: string) => {
          const bp = <BreakpointKey>screen;
          if (this.mediaMatcher.matchMedia(gridResponsiveMap[bp]).matches && g[bp]) {
            result[index] = <number>g![bp];
          }
        });
      } else {
        result[index] = g || null;
      }
    });
    return result;
  }

  setGutterStyle(): void {
    const [horizontalGutter, verticalGutter] = this.getGutter;
    this.actualGutter$.next([horizontalGutter, verticalGutter]);
    const renderGutter = (name: string, gutter: number | null): void => {
      if (gutter !== null) {
        this.renderer.setStyle(this.element, name, `-${gutter / 2}px`);
      }
    };
    renderGutter('margin-left', horizontalGutter);
    renderGutter('margin-right', horizontalGutter);
    renderGutter('margin-top', verticalGutter);
    renderGutter('margin-bottom', verticalGutter);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
