import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'

const tableBody = document.querySelector("#table-body");
const kProductAPI = '/api'
let allData = [];

const validateFormValues = (car) => {
  if (car.model.length > 50) return false;
  if (car.description.length > 100) return false;
  if (car.year > 9000) return false;
  if (car.brand > 50) return false;
  if (car.kilometers > 1000000) return false;
  if (car.price > 10000000) return false;
  return true;
}

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

const loadTable = (start, limit) => {
  fetch(`${kProductAPI}?start=${start}&limit=${limit}`).then((res)=>res.json()).then((response)=>{
    allData = response;
    response.forEach((car)=>{
      appendCar(tableBody, car);
    });
  });
};

const clearTable = () => {
  tableBody.replaceChildren();
};

const getTableCount = async ()  => {
  const response = await fetch(`${kProductAPI}/getCount`);
  const json = await response.json();
  return json.count;
};

const clearAddForm = () => {
  document.querySelector('#brand').selectedIndex = 0;
  document.querySelector('#model').value = "";
  document.querySelector('#description').value = "";
  document.querySelector('#kilometers').value = "";
  document.querySelector('#price').value = "";
  document.querySelector('#year').value = "";
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

  if (!validateFormValues(car)) {
    //TODO: Set CSS attribute to invalid
    return;
  }

  const id = allData.length > 0 ? allData.at(-1).id + 1 : 1;
  fetch(`${kProductAPI}/${id}`,
    {
      method: 'POST',
      headers: {'Content-type':'application/json'},
      body:JSON.stringify(car)
    }).then((res)=>res.json()).then((car)=>{
      appendCar(tableBody, car);
      allData.push(car);
      clearAddForm();
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


  //TODO: Set CSS attribute for invalid format
  if(!validateFormValues(car)) return;

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

const limit = 4;
let page = 0;

const totalCars = await getTableCount();
const pages = Math.ceil(totalCars / limit);
const tableLimit = totalCars <= limit ? 0 : limit;
loadTable(page * limit, tableLimit);

const navbar = document.querySelector('#nav_bar');
const navNext = document.querySelector('#nav_next');
const navPrev = document.querySelector('#nav_prev');

const initPagination = () => {
  for (let i=1; i<=pages; ++i) {
    let navli = document.createElement('li'); 
    navli.classList.add('page-item');
    let nava = document.createElement('a');
    nava.classList.add('page-link');
    nava.href = '#';
    nava.innerText = `${i}`;
    if (i == 1) {
      navli.classList.add('active');
    }

    nava.addEventListener('click', (event) => {
      event.preventDefault();
      const tgtPage = parseInt(event.target.innerText);
      clearTable();
      navbar.querySelectorAll('.active').forEach((e)=>{e.classList.remove('active')});
      navbar.querySelectorAll('.disabled').forEach((e)=>{e.classList.remove('disabled')});
      loadTable((tgtPage - 1)  * limit, tableLimit);
      event.target.classList.add('active');

      if (tgtPage == 1) {
        navPrev.classList.add('disabled');
      }
      else if(tgtPage == pages) {
        navNext.classList.add('disabled');
      }
    });

    navli.append(nava);
    navbar.insertBefore(navli, navNext);
  }
};

navPrev.addEventListener('click', (event) => {
  event.preventDefault();
  const active = parseInt(navbar.querySelector('.active').innerText);
  const tgtPage = active - 1;
  const childs = navbar.children;
  for(let i=0; i<childs.length; ++i) {
    if (childs[i].innerText == tgtPage) {
      childs[i].firstChild.dispatchEvent(new Event('click'));
      return;
    }
  }
});
navNext.addEventListener('click', (event) => {
  event.preventDefault();
  const active = parseInt(navbar.querySelector('.active').innerText);;
  const tgtPage = parseInt(active) + 1;
  const childs = navbar.children;
  for (let i = 0; i < childs.length; ++i) {
    if (childs[i].innerText == tgtPage) {
      childs[i].firstChild.dispatchEvent(new Event('click'));
      return;
    }
  }
});

if (tableLimit == 0) {
  navbar.remove();
} else {
  initPagination();
  navPrev.classList.add('disabled');
}