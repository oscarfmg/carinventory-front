import React, { createContext } from 'react';
import type { CarList, Car as CarType, NewCar as NewCarType } from '../types';
import { useCarsReducer } from '../hooks/useCarsReducer';

interface Props {
  children: React.ReactNode;
}

export interface CarContent {
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
}

export const CarContext = createContext<CarContent | null>(null);

export const CarProvider: React.FC<Props> = ({ children }) => {
  const {
    cars,
    handleCreate,
    handleUpdate,
    handleDelete,
    dialogVisible,
    updateDlgData,
    setUpdateId,
    carCount,
    activePage,
    setActivePage,
    carsXPage,
  } = useCarsReducer();

  return (
    <CarContext.Provider
      value={{
        cars,
        handleCreate,
        handleUpdate,
        handleDelete,
        dialogVisible,
        updateDlgData,
        setUpdateId,
        carCount,
        activePage,
        setActivePage,
        carsXPage,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};
