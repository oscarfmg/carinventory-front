import { useEffect, useState } from 'react';
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
  const carsXPage = 4;

  const [cars, setCars] = useState(mockCars);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [updateId, _setUpdateId] = useState(0);
  const [updateDlgData, setUpdateDlgData] = useState(emptyCar);
  const [carCount, setCarCount] = useState(0);
  const [activePage, setActivePage] = useState(0);

  const handleCreate = (newCar: NewCarType): void => {
    const newcar: CarType = { id: -1, ...newCar };
    const lastCar = cars.at(-1);
    newcar.id = lastCar !== undefined ? lastCar.id + 1 : 1;
    pushCar(newcar)
      .then((createdCar) => {
        const newCars = [...cars, { ...createdCar }];
        setCars(newCars);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getCarCount()
      .then((count) => {
        setCarCount(count);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    fetchCars(activePage * carsXPage, carsXPage)
      .then((cars) => {
        setCars(cars);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [carCount, activePage]);

  const handleUpdate = (updateCar: CarType): void => {
    replaceCar(updateCar)
      .then((newCar) => {
        const newCars = cars.map((car) => {
          if (car.id === newCar.id) {
            return newCar;
          }
          return car;
        });
        setCars(newCars);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (updateId === 0) {
      const newModalData = emptyCar;
      setUpdateDlgData(newModalData);
      return;
    }
    const newModalData = cars[updateId - 1];
    setUpdateDlgData(newModalData);
  }, [updateId]);

  useEffect(() => {
    setDialogVisible(updateId !== 0);
  }, [updateDlgData]);

  const setUpdateId = (id: number = 0): void => {
    _setUpdateId(id);
  };

  const handleDelete = (id: number): void => {
    deleteCar(id)
      .then((deletedCar) => {
        if (deletedCar.id !== -1) {
          const newCars = cars.filter((car) => car.id !== id);
          setCars(newCars);
        }
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
