import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Cars } from './components/Cars';
import { useCars } from './hooks/useCars';

function App(): JSX.Element {
  const { handleDelete, cars } = useCars();

  return (
    <>
      <h1>Car Inventory</h1>
      <Cars cars={cars} deleteCar={handleDelete} />
    </>
  );
}

export default App;
