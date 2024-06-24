import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Cars } from './components/Cars';
import { useCars } from './hooks/useCars';
import { CreateCar } from './components/CreateCar';
import { UpdateCar } from './components/UpdateCar';

function App(): JSX.Element {
  const { cars, modalShow, setModalShow, handleDelete, handleCreate } =
    useCars();

  return (
    <>
      <h1>Car Inventory</h1>
      <CreateCar createCar={handleCreate} />
      <Cars cars={cars} deleteCar={handleDelete} setModalShow={setModalShow} />
      <UpdateCar
        modalShow={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
      />
    </>
  );
}

export default App;
