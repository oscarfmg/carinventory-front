import { emptyCar } from '../mocks/mockCars';
import { type CarList, type Car as CarType } from '../types';

interface ProductState {
  cars: CarList;
  dialogVisible: boolean;
  updateId: number;
  updateDlgData: CarType;
  carCount: number;
  activePage: number;
  carsXPage: number;
}

export enum ProductActionTypes {
  kAddCar = 1,
  kUpdateCar,
  kDeleteCar,
  kInitCars,
  kChangeActivePage,
  kUpdateCarCount,
  kChangeUpdateID,
}

type ProductAction =
  | { type: ProductActionTypes.kDeleteCar; payload: { id: number } }
  | { type: ProductActionTypes.kUpdateCar; payload: { car: CarType } }
  | { type: ProductActionTypes.kAddCar; payload: { newCar: CarType } }
  | { type: ProductActionTypes.kUpdateCarCount; payload: { carCount: number } }
  | { type: ProductActionTypes.kInitCars; payload: { cars: CarList } }
  | { type: ProductActionTypes.kChangeUpdateID; payload: { id: number } }
  | {
      type: ProductActionTypes.kChangeActivePage;
      payload: { cars: CarList; page: number };
    };

export const carReducer = (
  state: ProductState,
  action: ProductAction
): ProductState => {
  const { type, payload } = action;

  if (type === ProductActionTypes.kAddCar) {
    const newCars = [...state.cars, payload.newCar];
    return { ...state, cars: newCars };
  }

  if (type === ProductActionTypes.kUpdateCar) {
    const newCar = payload.car;
    const newCars = state.cars.map((car) => {
      if (car.id === newCar.id) {
        return newCar;
      }
      return car;
    });
    const newState = { ...state, cars: newCars };
    return newState;
  }

  if (type === ProductActionTypes.kDeleteCar) {
    return {
      ...state,
      cars: state.cars.filter((car) => car.id !== payload.id),
    };
  }

  if (type === ProductActionTypes.kChangeUpdateID) {
    const updateId = payload.id;
    const newModalData =
      updateId === 0
        ? emptyCar
        : state.cars.find((car) => car.id === updateId) ?? emptyCar;
    return {
      ...state,
      updateDlgData: newModalData,
      dialogVisible: updateId !== 0,
    };
  }

  if (type === ProductActionTypes.kInitCars) {
    return { ...state, cars: payload.cars };
  }

  if (type === ProductActionTypes.kUpdateCarCount) {
    return { ...state, carCount: payload.carCount };
  }

  if (type === ProductActionTypes.kChangeActivePage) {
    return { ...state, cars: payload.cars, activePage: payload.page };
  }
  return state;
};
