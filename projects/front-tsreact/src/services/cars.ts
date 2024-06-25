import { emptyCar } from '../mocks/mockCars';
import { type Car, type CarList } from '../types';

const kProductApi = '/api';

export const fetchCars = async (): Promise<CarList> => {
  const res = await fetch(kProductApi);
  if (!res.ok) {
    console.error('BBB');
    return [];
  }
  const cars = (await res.json()) as CarList;
  return cars;
};

export const pushCar = async (car: Car): Promise<Car> => {
  console.log(car);
  if (car.id <= 0) {
    console.error('BBB');
    return emptyCar;
  }
  const res = await fetch(`${kProductApi}/${car.id}`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(car),
  });
  const newCar = (await res.json()) as Car;
  return newCar;
};

export const replaceCar = async (car: Car): Promise<Car> => {
  console.log(car);
  if (car.id <= 0) {
    console.error('BBB');
    return emptyCar;
  }
  const res = await fetch(`${kProductApi}/${car.id}`, {
    method: 'PATCH',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(car),
  });
  if (!res.ok) {
    return emptyCar;
  }
  const newCar = (await res.json()) as Car;
  return newCar;
};

export const deleteCar = async (id: number): Promise<Car> => {
  console.log(id);
  const res = await fetch(`${kProductApi}/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    return emptyCar;
  }
  const deletedCar = (await res.json()) as Car;
  return deletedCar;
};
