import { Button } from 'react-bootstrap';
import type { Car as CarType } from '../types';
import React from 'react';

interface Props extends CarType {
  deleteCar: (id: number) => void;
  setUpdateId: (id: number) => void;
}

export const Car: React.FC<Props> = ({
  id,
  brand,
  model,
  description,
  year,
  kilometers,
  price,
  deleteCar,
  setUpdateId,
}) => {
  return (
    <>
      <tr key={id}>
        <td>{id}</td>
        <td>{brand}</td>
        <td>{model}</td>
        <td>{description}</td>
        <td>{year > 0 ? year : ''}</td>
        <td>{kilometers}</td>
        <td>{price}</td>
        <td>
          <Button
            variant="warning"
            onClick={() => {
              setUpdateId(id);
            }}
          >
            Edit
          </Button>
        </td>
        <td>
          <Button
            variant="danger"
            onClick={() => {
              deleteCar(id);
            }}
          >
            Delete
          </Button>
        </td>
      </tr>
    </>
  );
};
