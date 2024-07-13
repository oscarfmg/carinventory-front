import { createContext } from 'react';

export type CarContent = {
  tst: number;
};

export const CarContext = createContext<CarContent>({ tst: 1 });
