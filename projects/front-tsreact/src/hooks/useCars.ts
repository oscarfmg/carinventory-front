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
  showUpdateModal: (show: boolean, id: number) => void;
  updateId: number;
  modalShow: boolean;
  modalData: CarType;
} => {
  const [cars, setCars] = useState(mockCars);
  const [modalShow, setModalShow] = useState(false);
  const [updateId, setUpdateId] = useState(-1);
  const [modalData, setModalData] = useState(emptyCar);

  useEffect(() => {
    console.log(`Update ${updateId}`);
    if (updateId < 0) {
      const newModalData = emptyCar;
      setModalData(newModalData);
      return;
    }
    const newModalData = cars[updateId - 1];
    setModalData(newModalData);
  }, [updateId]);

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

  const handleDelete = (id: number): void => {
    console.log(id);
    const newCars = cars.filter((car) => car.id !== id);
    setCars(newCars);
  };

  const showUpdateModal = (show: boolean, id: number = 0): void => {
    console.log(`Update ${id}`);
    setUpdateId(id);
    setModalShow(show);
  };

  return {
    cars,
    handleCreate,
    handleDelete,
    modalShow,
    handleUpdate,
    showUpdateModal,
    updateId,
    modalData,
  };
};
