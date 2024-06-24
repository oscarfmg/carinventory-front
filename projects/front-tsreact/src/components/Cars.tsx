import React from 'react';
import { Car } from './Car';
import type { CarList } from '../types';
import Table from 'react-bootstrap/Table';

interface Props {
  cars: CarList;
  deleteCar: (id: number) => void;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Cars: React.FC<Props> = ({ cars, deleteCar, setModalShow }) => {
  return (
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
            deleteCar={deleteCar}
            setModalShow={setModalShow}
          />
        ))}
      </tbody>
    </Table>
  );
};
