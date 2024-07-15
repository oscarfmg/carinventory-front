import { Button } from 'react-bootstrap';
import type { Car as CarType } from '../types';
import React from 'react';
import { useCars } from '../hooks/useCars';

interface Props extends CarType {}

export const Car: React.FC<Props> = ({
  id,
  brand,
  model,
  description,
  year,
  kilometers,
  price,
}) => {
  const { setUpdateId, handleDelete } = useCars();
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
              handleDelete(id);
            }}
          >
            Delete
          </Button>
        </td>
      </tr>
    </>
  );
};
