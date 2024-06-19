/* eslint-disable react/prop-types */
import type { Car as CarType } from '../types';

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
        <td></td>
      </tr>
    </>
  );
};
