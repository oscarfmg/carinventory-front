import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'

const tableBody = document.querySelector("#table-body");
const kProductAPI = '/api'
let allData = [];

const appendCar = (table, car) => {
  if (car.year < 0) car.year = '';
  let row = document.createElement('tr');
  const cells = `
    <td>${car.id}</td>
    <td>${car.brand}</td>
    <td>${car.model}</td>
    <td>${car.description}</td>
    <td>${car.year}</td>
    <td>${car.kilometers}</td>
    <td>${car.price}</td>`;
  row.innerHTML = cells;
  table.append(row);
}

const loadTable = () => {
  const data = fetch(kProductAPI).then((res)=>res.json()).then((response)=>{
    allData = response;
    response.forEach((car)=>{
      appendCar(tableBody, car);
    });
  });
};

const addCar = (e) => {
  e.preventDefault();
  const year  = document.querySelector('#year').value;
  const description = document.querySelector('#description').value;
  let car = {
    brand: document.querySelector('#brand').value,
    model: document.querySelector('#model').value,
    kilometers:   document.querySelector('#kilometers').value,
    price: document.querySelector('#price').value
  };
  if (year)
    car.year = year;
  if (description)
    car.description = description;

  const id = allData.at(-1).id + 1;
  fetch(`${kProductAPI}/${id}`,
    {
      method: 'POST',
      headers: {'Content-type':'application/json'},
      body:JSON.stringify(car)
    }).then((res)=>res.json()).then((car)=>{
      appendCar(tableBody, car);
      allData.push(car);
    });
};

document.querySelector('#car-form').addEventListener('submit', addCar);

loadTable();