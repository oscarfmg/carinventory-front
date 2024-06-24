import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Cars } from './components/Cars';
import { useCars } from './hooks/useCars';
import { CreateCar } from './components/CreateCar';
import { UpdateCar } from './components/UpdateCar';

function App(): JSX.Element {
  const {
    cars,
    handleCreate,
    handleUpdate,
    handleDelete,
    updateId,
    modalShow,
    modalData,
    showUpdateModal,
  } = useCars();

  return (
    <>
      <h1>Car Inventory</h1>
      <CreateCar createCar={handleCreate} />
      <Cars
        cars={cars}
        deleteCar={handleDelete}
        setModalShow={showUpdateModal}
      />
      <UpdateCar
        modalShow={modalShow}
        hideModal={() => {
          showUpdateModal(false, -1);
        }}
        updateId={updateId}
        modalData={modalData}
        updateCar={handleUpdate}
      />
    </>
  );
}

export default App;
