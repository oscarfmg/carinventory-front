import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Cars } from './components/Cars';
import { useCars } from './hooks/useCars';
import { CreateCar } from './components/CreateCar';
import { UpdateCar } from './components/UpdateCar';
import { CarPagination } from './components/CarPagination';
import { CarContext } from './context/Car';
import { useEffect } from 'react';

function App(): JSX.Element {
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
  } = useCars();

  useEffect(() => {
    console.log('CarsMODIFIED insideAPP');
  }, [cars]);

  return (
    <CarContext.Provider value={{ tst: 1 }}>
      <h1>Car Inventory</h1>
      <CreateCar createCar={handleCreate} />
      <Cars cars={cars} deleteCar={handleDelete} setUpdateId={setUpdateId} />
      <CarPagination
        cars={cars}
        carsXPage={carsXPage}
        carCount={carCount}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <UpdateCar
        visible={dialogVisible}
        updateDlgData={updateDlgData}
        hideDialog={() => {
          // setUpdateId(0);
        }}
        updateCar={handleUpdate}
      />
    </CarContext.Provider>
  );
}

export default App;
