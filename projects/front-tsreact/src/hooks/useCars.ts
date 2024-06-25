import { useEffect, useState } from 'react';
import { emptyCar, mockCars } from '../mocks/mockCars';
import { deleteCar, fetchCars, pushCar, replaceCar } from '../services/cars';
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
} => {
  const [cars, setCars] = useState(mockCars);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [updateId, _setUpdateId] = useState(0);
  const [updateDlgData, setUpdateDlgData] = useState(emptyCar);

  const handleCreate = (newCar: NewCarType): void => {
    const newcar: CarType = { id: -1, ...newCar };
    const lastCar = cars.at(-1);
    newcar.id = lastCar !== undefined ? lastCar.id + 1 : 1;
    pushCar(newcar)
      .then((createdCar) => {
        console.log(createdCar);
        const newCars = [...cars, { ...createdCar }];
        setCars(newCars);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchCars()
      .then((cars) => {
        setCars(cars);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleUpdate = (updateCar: CarType): void => {
    console.log(updateCar);
    replaceCar(updateCar)
      .then((newCar) => {
        console.log(newCar);
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
        console.log(deletedCar);
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
  };
};
