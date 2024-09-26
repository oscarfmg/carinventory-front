import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { useCarsActions } from '../hooks/useCarsActions';
import { useAppSelector } from '../hooks/store';

type PageList = JSX.Element[];

export const CarPagination: React.FC = () => {
  const {setActivePage} = useCarsActions();
  const {cars, carsXPage, carCount, activePage} = useAppSelector((state) => state.cars);
  const [carsPags, setCarsPags] = useState([] as PageList);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setTotalPages(Math.ceil(carCount / carsXPage));
  }, [carCount]);

  useEffect(() => {
    const items: PageList = [];
    for (let i = 0; i < totalPages; ++i) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === activePage}
          onClick={() => {
            setActivePage(i);
          }}
        >
          {i + 1}
        </Pagination.Item>
      );
    }
    setCarsPags(items);
  }, [cars, activePage]);

  return (
    <div className="carPag">
      <Pagination>
        <Pagination.First
          onClick={() => {
            setActivePage(0);
          }}
        />
        {carsPags}
        <Pagination.Last
          onClick={() => {
            setActivePage(totalPages - 1);
          }}
        />
      </Pagination>
    </div>
  );
};
