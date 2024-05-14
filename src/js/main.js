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
    <td>${car.price}</td>
    <td><button class="btn btn-warning btn-edit" data-id="${car.id}" >Edit</button></td>
    <td><button class="btn btn-danger btn-delete" data-id="${car.id}" >Delete</button></td>`;
  row.innerHTML = cells;
  const deleteBtn = row.querySelector(".btn-delete");
  deleteBtn.addEventListener('click',deleteCar);
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

const deleteCar = (e) => {
  const id = e.target.getAttribute('data-id');
  fetch(`${kProductAPI}/${id}`,
    {
      method: 'DELETE'
    }).then((res)=>res.json()).then((car)=>{
      allData.splice(allData.findIndex(x=>x.id==car.id),1);
      for(let i=0; i<tableBody.children.length; ++i) {
        if (tableBody.children[i].children[0].innerHTML == car.id) {
          tableBody.children[i].remove();
        }
      }
    });
}

document.querySelector('#car-form').addEventListener('submit', addCar);

loadTable();