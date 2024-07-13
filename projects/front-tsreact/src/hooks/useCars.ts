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
  | { type: ProductActionTypes.kAddCar; payload: { newCar: NewCarType } }
  | { type: ProductActionTypes.kChangeActivePage; payload: { page: number } }
  | { type: ProductActionTypes.kUpdateCarCount; payload: { carCount: number } }
  | { type: ProductActionTypes.kInitCars; payload: { cars: CarList } }
  | { type: ProductActionTypes.kChangeUpdateID; payload: { id: number } };

export const carReducer = (
  state: ProductState,
  action: ProductAction
): ProductState => {
  const { type, payload } = action;
  switch (type) {
    case ProductActionTypes.kAddCar:
      {
        const newcar: CarType = { id: -1, ...payload.newCar };
        const lastCar = state.cars.at(-1);
        newcar.id = lastCar !== undefined ? lastCar.id + 1 : 1;
        pushCar(newcar)
          .then((createdCar) => {
            const newCars = [...state.cars, { ...createdCar }];
            return { ...state, cars: newCars };
          })
          .catch((err) => {
            console.error(err);
          });
      }
      break;

    case ProductActionTypes.kUpdateCar:
      console.log(`Replace Car`);
      console.log(payload);
      replaceCar(payload.car)
        .then((newCar) => {
          const newCars = state.cars.map((car) => {
            if (car.id === newCar.id) {
              return newCar;
            }
            return car;
          });
          console.log(state.cars);
          console.log(newCars);
          const newState = { ...state, cars: newCars, dialogVisible: false };
          console.log(newState);
          return newState;
        })
        .catch((err) => {
          console.error(err);
        });
      break;

    case ProductActionTypes.kDeleteCar:
      {
        const { id } = action.payload;
        console.log(id);
        deleteCar(id)
          .then((deletedCar) => {
            if (deletedCar.id !== -1) {
              const newCars = state.cars.filter((car) => car.id !== id);
              console.log(newCars);
              return { ...state, cars: newCars };
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
      break;

    case ProductActionTypes.kChangeUpdateID: {
      console.log(payload);
      console.log(state.cars);
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

    case ProductActionTypes.kInitCars: {
      console.log('Init Cars');
      return { ...state, cars: payload.cars };
    }

    case ProductActionTypes.kUpdateCarCount: {
      return { ...state, carCount: payload.carCount };
    }

    case ProductActionTypes.kChangeActivePage:
      fetchCars(payload.page * state.carsXPage, state.carsXPage)
        .then((cars) => {
          console.log(cars);
          return { ...state, activePage: payload.page, cars };
        })
        .catch((err) => {
          console.error(err);
        });
      break;

    default:
      return state;
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
    dispatch({ type: ProductActionTypes.kAddCar, payload: { newCar } });
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
  }, []);

  useEffect(() => {
    fetchCars(activePage * carsXPage, carsXPage)
      .then((cars) => {
        dispatch({ type: ProductActionTypes.kInitCars, payload: { cars } });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [carCount]);

  const handleUpdate = (updateCar: CarType): void => {
    console.log('handleUpdate');
    dispatch({
      type: ProductActionTypes.kUpdateCar,
      payload: { car: updateCar },
    });
  };

  const setUpdateId = (id: number = 0): void => {
    console.log(id);
    dispatch({ type: ProductActionTypes.kChangeUpdateID, payload: { id } });
  };

  const handleDelete = (id: number): void => {
    dispatch({
      type: ProductActionTypes.kDeleteCar,
      payload: { id },
    });
  };

  const setActivePage = (page: number): void => {
    console.log(page);
    dispatch({ type: ProductActionTypes.kChangeActivePage, payload: { page } });
  };

  useEffect(() => {
    console.log('CARS MODIFIED');
    console.log(cars);
  }, [cars]);

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
