import { Renderer2 } from "@angular/core";

export enum BreakpointEnum {
  xxl = 'xxl',
  xl = 'xl',
  lg = 'lg',
  md = 'md',
  sm = 'sm',
  xs = 'xs',
}

export type BreakpointMap = { [key in BreakpointEnum]: string };
export type BreakpointKey = keyof typeof BreakpointEnum;
export type BreakpointBooleanMap = { [key in BreakpointEnum]: boolean };

export interface EmbeddedProperty {
  span?: number;
  pull?: number;
  push?: number;
  offset?: number;
  order?: number;
}

export interface ClassInterface {
  [klass: string]: any;
}

export interface IndexableObject {
  [key: string]: any;
}

export type justifyType =
  | 'start'
  | 'end'
  | 'center'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';
export type alignType = 'top' | 'middle' | 'bottom';

export function isNotNil<T>(value: T): value is NonNullable<T> {
  return typeof value !== 'undefined' && value !== null;
}

export function parseFlex(flex: number | string | null): string | null {
  if (typeof flex === 'number') {
    return `${flex} ${flex} auto`;
  } else if (typeof flex === 'string') {
    if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
      return `0 0 ${flex}`;
    }
  }
  return flex;
}

export const gridResponsiveMap: BreakpointMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)',
};