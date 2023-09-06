export interface ICuestion {
  cuestion?: string;
  date?: number;
  correct?: boolean;
  correct_aunswer?: string;
  aunswer?: string;
  used?: number;
  summary?: string;
  active?: boolean;
}
export interface IAunswer {
  aunswer?: string;
  date?: number
  used?: number;
}

