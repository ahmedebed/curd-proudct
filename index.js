let title = document.getElementById("title");
let price = document.getElementById("price");
let taxs = document.getElementById("taxs");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
//let search = document.getElementById("search");
let searchTitle = document.getElementById("searchTitle");
let searchCategory = document.getElementById("searchCategory");

let mood = "create";
let tmp;
// get Total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxs.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "red";
  }
}
//create proudct

//array 34an a7ot feha data
let dataPro = [];
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

create.onclick = function () {
  let newPro = {
    title: title.value,
    price: price.value,
    taxs: taxs.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  if (mood === "create") {
    if (newPro.count > 1) {
      for (let i = 0; i < newPro.count; i++) {
        dataPro.push(newPro);
      }
    } else {
      dataPro.push(newPro);
    }
  } else {
    dataPro[tmp] = newPro;
    mood = "create";
    count.style.display = "block";
    create.innerHTML = "Create";
  }

  localStorage.setItem("product", JSON.stringify(dataPro));
  clearDate();
  showData();
};
function clearDate() {
  title.value = "";
  price.value = "";
  taxs.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
// read
function showData() {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `<tr>
    <td>${i + 1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxs}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button id="update" onclick="updataData(${i})">Update</button></td>
    <td><button onclick="deleteProudct(${i})" id="delete">Delete</button></td>
  </tr>`;
  }

  document.getElementById("tbody").innerHTML = table;
  let btnDeleteAll = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btnDeleteAll.innerHTML = `<button onclick="deleteAll()">Delete All(${dataPro.length})</button>`;
  } else {
    btnDeleteAll.innerHTML = ``;
  }
  getTotal();
}
showData();
//delete item
function deleteProudct(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}
//delete All Item
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}
//updateData
function updataData(i) {
  tmp = i;
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxs.value = dataPro[i].taxs;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataPro[i].category;
  create.innerHTML = "Update";
  mood = "update";
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
//search
let searchMood = "title";
function getSearchMood(id) {
  console.log(id);
  if (id == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
}
