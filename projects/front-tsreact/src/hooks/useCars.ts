import { useEffect, useReducer } from 'react';
import { emptyCar, mockCars } from '../mocks/mockCars';
import {
  deleteCar,
  fetchCars,
  getCarCount,
  pushCar,
  replaceCar,
} from '../services/cars';
import {
  type CarList,
  type Car as CarType,
  type NewCar as NewCarType,
} from '../types';

const initialCarsXPage = 4;

const initialState = {
  cars: mockCars,
  dialogVisible: false,
  updateId: 0,
  updateDlgData: emptyCar,
  carCount: -1,
  activePage: 0,
  carsXPage: initialCarsXPage,
};

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

export const useCars = (): {
  cars: CarList;
  handleCreate: (newCar: NewCarType) => void;
  handleUpdate: (updateCar: CarType) => void;
  handleDelete: (id: number) => void;
  setUpdateId: (id: number) => void;
  dialogVisible: boolean;
  updateDlgData: CarType;
  carCount: number;
  activePage: number;
  setActivePage: (page: number) => void;
  carsXPage: number;
} => {
  const [
    { cars, dialogVisible, updateDlgData, carCount, activePage, carsXPage },
    dispatch,
  ] = useReducer(carReducer, initialState);

  const handleCreate = (newCar: NewCarType): void => {
    const newcar: CarType = { id: -1, ...newCar };
    const lastCar = cars.at(-1);
    newcar.id = lastCar !== undefined ? lastCar.id + 1 : 1;
    pushCar(newcar)
      .then((createdCar) => {
        dispatch({
          type: ProductActionTypes.kAddCar,
          payload: { newCar: createdCar },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (carCount === -1) {
      getCarCount()
        .then((carCount) => {
          dispatch({
            type: ProductActionTypes.kUpdateCarCount,
            payload: { carCount },
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
    fetchCars(activePage * carsXPage, carsXPage)
      .then((cars) => {
        dispatch({ type: ProductActionTypes.kInitCars, payload: { cars } });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleUpdate = (updateCar: CarType): void => {
    replaceCar(updateCar)
      .then((newCar) => {
        dispatch({
          type: ProductActionTypes.kUpdateCar,
          payload: { car: newCar },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const setUpdateId = (id: number = 0): void => {
    dispatch({ type: ProductActionTypes.kChangeUpdateID, payload: { id } });
  };

  const handleDelete = (id: number): void => {
    deleteCar(id)
      .then((deletedCar) => {
        if (deletedCar.id !== -1) {
          dispatch({
            type: ProductActionTypes.kDeleteCar,
            payload: { id },
          });
        }
      })
      .then((ns) => ns)
      .catch((err) => {
        console.error(err);
      });
  };

  const setActivePage = (page: number): void => {
    fetchCars(page * carsXPage, carsXPage)
      .then((cars) => {
        dispatch({
          type: ProductActionTypes.kChangeActivePage,
          payload: { cars, page },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return {
    cars,
    handleCreate,
    handleDelete,
    handleUpdate,
    setUpdateId,
    dialogVisible,
    updateDlgData,
    carCount,
    activePage,
    setActivePage,
    carsXPage,
  };
};
