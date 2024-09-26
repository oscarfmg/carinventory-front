import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { emptyCar, mockCars } from '../../mocks/mockCars';
import type { CarId, CarList, Car as CarType } from '../../types';

const initialCarsXPage = 4;

export interface ProductState {
    cars: CarList;
    dialogVisible: boolean;
    updateId: number;
    updateDlgData: CarType;
    carCount: number;
    activePage: number;
    carsXPage: number;
}

const initialState: ProductState = {
    cars: mockCars,
    dialogVisible: false,
    updateId: 0,
    updateDlgData: emptyCar,
    carCount: -1,
    activePage: 0,
    carsXPage: initialCarsXPage,
};

export interface NewActivePage {
    cars: CarList;
    activePage: number;
}

export const carsSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: {
        addCar: (state, action: PayloadAction<CarType>) => {
            state.cars.push(action.payload);
        },
        updateCar: (state, action: PayloadAction<CarType>) => {
            const newCar = action.payload;
            const newCars = state.cars.map((car) => {
                if (car.id === newCar.id) {
                    return newCar;             
                }
                return car;
            });
            const newState = { ...state, cars: newCars };
            return newState;            
        },
        deleteCar: (state, action: PayloadAction<CarId>) => {
            return {
                ...state,
                cars: state.cars.filter((car) => car.id !== action.payload.id),
            };
        },
        changeUpdateId: (state, action: PayloadAction<CarId>) => {
            const updateId = action.payload.id;
            const newModalData =
                updateId === 0
                    ? emptyCar
                    : state.cars.find((car) => car.id === updateId) ?? emptyCar;
            return {
                ...state,
                updateDlgData: newModalData,
                dialogVisible: updateId !== 0,
            };
        },
        initCars: (state, action: PayloadAction<CarList>) => {
            return {...state, cars:action.payload};
        },
        updateCarCount: (state, action: PayloadAction<number>) => {
            return { ...state, carCount: action.payload };
        },
        changeActivePage: (state, action: PayloadAction<NewActivePage>) => {
            return { 
                ...state, 
                cars: action.payload.cars, 
                activePage: action.payload.activePage 
            };
        },
    },
});

export default carsSlice.reducer;

export const { addCar, updateCar, deleteCar, changeUpdateId, 
               initCars, updateCarCount, changeActivePage } = carsSlice.actions;