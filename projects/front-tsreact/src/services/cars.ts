import { emptyCar } from '../mocks/mockCars';
import { type Car, type CarList } from '../types';

const kProductApi = '/api';

export const getCarCount = async (): Promise<number> => {
  const res = await fetch(`${kProductApi}/getCount`);
  if (!res.ok) {
    console.error('Error getting the product count.');
    return 0;
  }
  const { count: total } = (await res.json()) as { count: number };
  return total;
};

export const fetchCars = async (
  start: number = 0,
  limit: number = 0
): Promise<CarList> => {
  const res = await fetch(`${kProductApi}?start=${start}&limit=${limit}`);
  if (!res.ok) {
    console.error('Error fetching the products.');
    return [];
  }
  const cars = (await res.json()) as CarList;
  return cars;
};

export const pushCar = async (car: Car): Promise<Car> => {
  if (car.id <= 0) {
    return await createCarWithoutID(car);
  } else {
    return await createCarWithID(car);
  }
};

const createCarWithID = async (car: Car): Promise<Car> => {
  const res = await fetch(`${kProductApi}/${car.id}`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(car),
  });
  const newCar = (await res.json()) as Car;
  return newCar;
};

const createCarWithoutID = async (car: Car): Promise<Car> => {
  const res = await fetch(`${kProductApi}`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(car),
  });
  const newCar = (await res.json()) as Car;
  return newCar;
};

export const replaceCar = async (car: Car): Promise<Car> => {
  if (car.id <= 0) {
    console.error('Error updating the product.');
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
  const res = await fetch(`${kProductApi}/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    console.error('Error deleting the product.');
    return emptyCar;
  }
  const deletedCar = (await res.json()) as Car;
  return deletedCar;
};
