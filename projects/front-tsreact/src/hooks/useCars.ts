import { useContext } from 'react';
import { CarContext } from '../contexts/Car';

export const useCars = () => {
  const context = useContext(CarContext);

  if (context === null) {
    throw new Error('useCars must be used within a CarProvider');
  }

  return context;
};
