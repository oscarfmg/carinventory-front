import { useState } from 'react';
import { mockCars } from '../mocks/mockCars';
import { type CarList, type NewCar as NewCarType } from '../types';

export const useCars = (): {
  cars: CarList;
  handleCreate: (newCar: NewCarType) => void;
  handleDelete: (id: number) => void;
} => {
  const [cars, setCars] = useState(mockCars);

  const handleCreate = (newCar: NewCarType): void => {
    console.log('Create');
    console.log(newCar);
    const newCars = [...cars, { id: cars.length + 1, ...newCar }];
    setCars(newCars);
  };

  const handleDelete = (id: number): void => {
    console.log(id);
    const newCars = cars.filter((car) => car.id !== id);
    setCars(newCars);
  };

  return { cars, handleCreate, handleDelete };
};
