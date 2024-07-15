import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Cars } from './components/Cars';
import { CreateCar } from './components/CreateCar';
import { UpdateCar } from './components/UpdateCar';
import { CarPagination } from './components/CarPagination';

function App(): JSX.Element {
  return (
    <>
      <h1>Car Inventory</h1>
      <CreateCar />
      <Cars />
      <CarPagination />
      <UpdateCar />
    </>
  );
}

export default App;
