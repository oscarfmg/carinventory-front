import React from 'react';
import { Car } from './Car';
import Table from 'react-bootstrap/Table';
import { useCars } from '../hooks/useCars';

export const Cars: React.FC = () => {
  const { cars } = useCars();
  return (
    <>
      <Table hover striped>
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <Car
              key={car.id}
              id={car.id}
              brand={car.brand}
              model={car.model}
              description={car.description}
              year={car.year}
              kilometers={car.kilometers}
              price={car.price}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
};
