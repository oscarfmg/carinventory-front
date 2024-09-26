import { useEffect } from 'react';
import {
  deleteCar as deleteCarDB,
  fetchCars,
  getCarCount,
  pushCar,
  replaceCar,
} from '../services/cars';
import type { Car as CarType, NewCar as NewCarType } from '../types';
import { useAppDispatch, useAppSelector } from './store';
import { addCar, changeActivePage, changeUpdateId, deleteCar, initCars, updateCar, updateCarCount } from '../stores/Cars/slice';

export const useCarsActions = (): {
  handleCreate: (newCar: NewCarType) => void;
  handleUpdate: (updateCar: CarType) => void;
  handleDelete: (id: number) => void;
  setUpdateId: (id: number) => void;
  setActivePage: (page: number) => void;
} => {
  const dispatch = useAppDispatch();
  const { carCount, activePage, carsXPage } = useAppSelector((state) => state.cars);

  const handleCreate = (newCar: NewCarType): void => {
    const newcar: CarType = { id: -1, ...newCar };
    pushCar(newcar)
      .then((createdCar) => {
          dispatch(addCar(createdCar));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (carCount === -1) {
      getCarCount()
        .then((carCount) => {
          dispatch(updateCarCount(carCount));
        })
        .catch((err) => {
          console.error(err);
        });
    }
    fetchCars(activePage * carsXPage, carsXPage)
      .then((cars) => {
        dispatch(initCars(cars));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleUpdate = (updatedCar: CarType): void => {
    replaceCar(updatedCar)
      .then((newCar) => {
        dispatch(updateCar(newCar));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const setUpdateId = (id: number = 0): void => {
    dispatch(changeUpdateId({id}));
  };

  const handleDelete = (id: number): void => {
    deleteCarDB(id)
      .then((deletedCar) => {
        if (deletedCar.id !== -1) {
          dispatch(deleteCar({ id }));
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
        dispatch(changeActivePage({ cars, activePage: page }));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return {
    handleCreate,
    handleDelete,
    handleUpdate,
    setUpdateId,
    setActivePage,
  };
};
