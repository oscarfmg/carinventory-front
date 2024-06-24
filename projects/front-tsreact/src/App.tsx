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
    dialogVisible,
    updateDlgData,
    showUpdateDialog,
  } = useCars();

  return (
    <>
      <h1>Car Inventory</h1>
      <CreateCar createCar={handleCreate} />
      <Cars
        cars={cars}
        deleteCar={handleDelete}
        setModalShow={showUpdateDialog}
      />
      <UpdateCar
        visible={dialogVisible}
        hideDialog={() => {
          showUpdateDialog(false, -1);
        }}
        updateDlgData={updateDlgData}
        updateCar={handleUpdate}
      />
    </>
  );
}

export default App;
