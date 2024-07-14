import { useEffect, useReducer } from 'react';
import { emptyCar, mockCars } from '../mocks/mockCars';
import { carReducer, ProductActionTypes } from '../reducers/Car';
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
