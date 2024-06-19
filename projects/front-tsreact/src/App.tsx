import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from 'react';
import { Cars } from './components/Cars';
import type { CarList } from './types';

const mockCars: CarList = [
  {
    id: 1,
    model: 'uno',
    brand: 'one',
    kilometers: 1,
    price: 'eins',
    description: '',
    year: -1,
  },
  {
    id: 2,
    model: 'dos',
    brand: 'two',
    kilometers: 2,
    price: 'zwei',
    description: 'deux',
    year: 2,
  },
  {
    id: 3,
    model: 'tres',
    brand: 'three',
    kilometers: 3,
    price: 'drei',
    description: 'trois',
    year: 3,
  },
  {
    id: 4,
    model: 'cuatro',
    brand: 'four',
    kilometers: 4,
    price: 'vier',
    description: 'quatre',
    year: 4,
  },
];

function App(): JSX.Element {
  const [cars] = useState(mockCars);
  return (
    <>
      <h1>Car Inventory</h1>
      <Cars cars={cars} />
    </>
  );
}

export default App;
