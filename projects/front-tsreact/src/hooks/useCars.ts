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
  showUpdateDialog: (visible: boolean, id: number) => void;
  dialogVisible: boolean;
  updateDlgData: CarType;
} => {
  const [cars, setCars] = useState(mockCars);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [updateId, setUpdateId] = useState(-1);
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
    if (updateId < 0) {
      const newModalData = emptyCar;
      setUpdateDlgData(newModalData);
      return;
    }
    const newModalData = cars[updateId - 1];
    setUpdateDlgData(newModalData);
  }, [updateId]);

  const showUpdateDialog = (visible: boolean, id: number = 0): void => {
    console.log(`Update ${id}`);
    setUpdateId(id);
    setDialogVisible(visible);
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
    showUpdateDialog,
    dialogVisible,
    updateDlgData,
  };
};
