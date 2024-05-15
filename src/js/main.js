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
    <td><button class="btn-edit" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-id="${car.id}" >Edit</button></td>
    <td><button class="btn-delete" data-id="${car.id}" >Delete</button></td>`;
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
          break;
        }
      }
    });
};

const editModalEl = document.getElementById('editModal');
const editModal = new bootstrap.Modal(editModalEl);

const loadingModalEl = document.getElementById('loadingModal');
const loadingModal = new bootstrap.Modal(loadingModalEl);


editModalEl.addEventListener('show.bs.modal', e => {
  const id = e.relatedTarget.getAttribute('data-bs-id');
  loadingModal.show(e.relatedTarget);
});

loadingModalEl.addEventListener('shown.bs.modal', (e) => {
  const id = e.relatedTarget.getAttribute('data-bs-id');
  fetch(`${kProductAPI}/${id}`)
    .then(res=>res.json())
    .then(car=>{
      editModalEl.querySelector('#id-edit').value = car.id;
      editModalEl.querySelector('#year-edit').value = car.year;
      editModalEl.querySelector('#description-edit').value = car.description;
      editModalEl.querySelector('#brand-edit').value = car.brand;
      editModalEl.querySelector('#model-edit').value = car.model;
      editModalEl.querySelector('#kilometers-edit').value = car.kilometers;
      editModalEl.querySelector('#price-edit').value = car.price;
    })
    .finally(()=>{loadingModal.hide()});
});

const editCar = (e) => {
  e.preventDefault();
  const id = editModalEl.querySelector('#id-edit').value;
  const year = editModalEl.querySelector('#year-edit').value;
  const description = editModalEl.querySelector('#description-edit').value;
  let car = {
    brand: document.querySelector('#brand-edit').value,
    model: document.querySelector('#model-edit').value,
    kilometers: document.querySelector('#kilometers-edit').value,
    price: document.querySelector('#price-edit').value,
  };
  if (year) car.year = year;
  if (description) car.description = description;
  console.log(car);

  fetch(`${kProductAPI}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(car)
    })
    .then(res=>res.json())
    .then(car=>{
      const allDataIdx = allData.findIndex(x=>x.id==car.id);
      allData[allDataIdx] = car;
      for (let i = 0; i < tableBody.children.length; ++i) {
        if (tableBody.children[i].children[0].innerHTML == car.id) {
          tableBody.children[i].children[1].innerHTML = car.brand;
          tableBody.children[i].children[2].innerHTML = car.model;
          tableBody.children[i].children[3].innerHTML = car.description;
          tableBody.children[i].children[4].innerHTML = car.year < 0 ? "" : car.year;
          tableBody.children[i].children[5].innerHTML = car.kilometers;
          tableBody.children[i].children[6].innerHTML = car.price;
          break;
        }
      }
    })
    .finally(editModal.hide());
};

document.querySelector('#car-edit-form').addEventListener('submit', editCar);
document.querySelector('#car-form').addEventListener('submit', addCar);

loadTable();