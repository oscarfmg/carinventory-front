import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';

const mockCars = [
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
      <Table bordered hover striped>
        <thead>
          <tr>
            <th>id</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Description</th>
            <th>Year</th>
            <th>Kilometers</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.id}</td>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.description}</td>
              <td>{car.year}</td>
              <td>{car.kilometers}</td>
              <td>{car.price}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default App;
