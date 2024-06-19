import { useState } from 'react';
import { mockCars } from '../mocks/mockCars';
import { type CarList } from '../types';

export const useCars = (): {
  cars: CarList;
  handleDelete: (id: number) => void;
} => {
  const [cars, setCars] = useState(mockCars);
  const handleDelete = (id: number): void => {
    console.log(id);
    const newCars = cars.filter((car) => car.id !== id);
    setCars(newCars);
  };

  return { cars, handleDelete };
};
