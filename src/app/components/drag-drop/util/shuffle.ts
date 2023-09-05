import { IAunswer } from '../models/data.model';

export function shuffleItems(array: IAunswer[]): IAunswer[] {
  const newArray = array.slice();
  newArray.sort(ramdomizer);
  return newArray;
}

const ramdomizer = (): number => {
  return Math.random() - 0.5;
};
