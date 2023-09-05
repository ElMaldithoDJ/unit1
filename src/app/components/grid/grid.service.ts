import { MediaMatcher } from '@angular/cdk/layout';
import { Injectable, NgZone, OnDestroy, Renderer2, RendererFactory2 } from '@angular/core';
import { Subject, takeUntil, Observable, map, startWith, distinctUntilChanged, auditTime, finalize } from 'rxjs';
import { BreakpointMap, BreakpointEnum, gridResponsiveMap, BreakpointBooleanMap } from './grid.interface';

@Injectable()
export class GridService {
  private destroy$ = new Subject<void>();

  constructor(
    private resizeService: ResizeService,
    private mediaMatcher: MediaMatcher
  ) {
    this.resizeService
      .subscribe()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  subscribe(breakpointMap: BreakpointMap): Observable<BreakpointEnum>;
  subscribe(
    breakpointMap: BreakpointMap,
    fullMap: true
  ): Observable<BreakpointBooleanMap>;
  subscribe(
    breakpointMap: BreakpointMap,
    fullMap?: true
  ): Observable<BreakpointEnum | BreakpointBooleanMap> {
    if (fullMap) {
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      const get = () => this.matchMedia(breakpointMap, true);
      return this.resizeService.subscribe().pipe(
        map(get),
        startWith(get()),
        distinctUntilChanged(
          (
            x: [BreakpointEnum, BreakpointBooleanMap],
            y: [BreakpointEnum, BreakpointBooleanMap]
          ) => x[0] === y[0]
        ),
        map((x) => x[1])
      );
    } else {
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      const get = () => this.matchMedia(breakpointMap);
      return this.resizeService
        .subscribe()
        .pipe(map(get), startWith(get()), distinctUntilChanged());
    }
  }

  private matchMedia(breakpointMap: BreakpointMap): BreakpointEnum;
  private matchMedia(
    breakpointMap: BreakpointMap,
    fullMap: true
  ): [BreakpointEnum, BreakpointBooleanMap];
  private matchMedia(
    breakpointMap: BreakpointMap,
    fullMap?: true
  ): BreakpointEnum | [BreakpointEnum, BreakpointBooleanMap] {
    let bp = BreakpointEnum.md;

    const breakpointBooleanMap: Partial<BreakpointBooleanMap> = {};

    Object.keys(breakpointMap).map((breakpoint) => {
      const castBP = breakpoint as BreakpointEnum;
      const matched = this.mediaMatcher.matchMedia(
        gridResponsiveMap[castBP]
      ).matches;

      breakpointBooleanMap[breakpoint as BreakpointEnum] = matched;

      if (matched) {
        bp = castBP;
      }
    });

    if (fullMap) {
      return [bp, breakpointBooleanMap as BreakpointBooleanMap];
    } else {
      return bp;
    }
  }
}

const NOOP = (): void => {};

@Injectable({
  providedIn: 'root'
})
export class ResizeService implements OnDestroy {
  private readonly resizeSource$ = new Subject<void>();

  private listeners = 0;

  private renderer: Renderer2;

  private disposeHandle = NOOP;

  private handler = (): void => {
    this.ngZone.run(() => {
      this.resizeSource$.next();
    });
  };

  constructor(private ngZone: NgZone, private rendererFactory2: RendererFactory2) {
    this.renderer = this.rendererFactory2.createRenderer(null, null);
  }

  ngOnDestroy(): void {
    // Caretaker note: the `handler` is an instance property (it's not defined on the class prototype).
    // The `handler` captures `this` and prevents the `NzResizeService` from being GC'd.
    this.handler = NOOP;
  }

  subscribe(): Observable<void> {
    this.registerListener();

    return this.resizeSource$.pipe(
      auditTime(16),
      finalize(() => this.unregisterListener())
    );
  }

  unsubscribe(): void {
    this.unregisterListener();
  }

  private registerListener(): void {
    if (this.listeners === 0) {
      this.ngZone.runOutsideAngular(() => {
        this.disposeHandle = this.renderer.listen('window', 'resize', this.handler);
      });
    }

    this.listeners += 1;
  }

  private unregisterListener(): void {
    this.listeners -= 1;

    if (this.listeners === 0) {
      this.disposeHandle();
      this.disposeHandle = NOOP;
    }
  }
}
