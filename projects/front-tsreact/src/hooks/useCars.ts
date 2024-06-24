import { useEffect, useState } from 'react';
import { emptyCar, mockCars } from '../mocks/mockCars';
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
    console.log('Create');
    console.log(newCar);
    const newCars = [...cars, { id: cars.length + 1, ...newCar }];
    setCars(newCars);
  };

  const handleUpdate = (updateCar: CarType): void => {
    console.log('Update');
    console.log(updateCar);
    const newCars = cars.map((car) => {
      if (car.id === updateCar.id) {
        return updateCar;
      }
      return car;
    });
    setCars(newCars);
  };

  useEffect(() => {
    console.log(`Update ${updateId}`);
    if (updateId === 0) {
      const newModalData = emptyCar;
      setUpdateDlgData(newModalData);
      return;
    }
    const newModalData = cars[updateId - 1];
    console.log(newModalData);
    setUpdateDlgData(newModalData);
    console.log(updateDlgData);
    setUpdateDlgData(newModalData);
  }, [updateId]);

  useEffect(() => {
    setDialogVisible(updateId !== 0);
  }, [updateDlgData]);

  const setUpdateId = (id: number = 0): void => {
    console.log(`Update ${id}`);
    _setUpdateId(id);
    // setDialogVisible(id !== 0);
  };

  const handleDelete = (id: number): void => {
    console.log(id);
    const newCars = cars.filter((car) => car.id !== id);
    setCars(newCars);
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
