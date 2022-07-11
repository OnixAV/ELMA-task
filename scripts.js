let urlUsers =
  "https://varankin_dev.elma365.ru/api/extensions/2a38760e-083a-4dd0-aebc-78b570bfd3c7/script/users";
let urlTasks =
  "https://varankin_dev.elma365.ru/api/extensions/2a38760e-083a-4dd0-aebc-78b570bfd3c7/script/tasks";
let arrUsers;
let arrTasks;
let backlog;
let dateDelta = new Date();
let cID = "uID";

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

function getDates(startDate, stopDate) {
  var dateArray = new Array();
  var currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
}

function setDates(currentDate) {
  let datesBlock = document.querySelector(".dates");
  let stopDate = currentDate.addDays(14);
  for (key of getDates(currentDate, stopDate)) {
    let month = key.getMonth() + 1;
    datesBlock.innerHTML += `<span class="date-elem">
    ${key.getDate() + "." + (month < 10 ? "0" + month : month)}</span>`;
  }
  console.log(datesBlock);
}

function btnRight(direction) {
  let datesBlock = document.querySelector(".dates");
  document.querySelectorAll(".date-elem").forEach((el) => {
    el.remove();
  });
  dateDelta = direction ? dateDelta.addDays(-15) : dateDelta.addDays(15);
  setDates(dateDelta);
}

async function getUsers() {
  let response = await fetch(urlUsers);
  arrUsers = await response.json();
  let key;
  let chart = document.querySelector(".chart");

  for (key in arrUsers) {
    chart.innerHTML += `<div class="chart-row" id="${cID}${arrUsers[key].id}">
    <div class="chart-row-item">
    
    ${arrUsers[key].username}
    </div>`;
  }
}

async function getTasks() {
  let response = await fetch(urlTasks);
  arrTasks = await response.json();
  let key;
  let backlist = document.querySelector(".back-list");
  let iter = 0;

  for (key in arrTasks) {
    if (arrTasks[key].executor == null) {
      backlist.innerHTML += `<div class="item-task js-card" id="${arrTasks[key].id}"" draggable="true">
      <p class="back-title">${arrTasks[key].subject}</p>
      <p class="back-subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>`;
    }
  }

  document.querySelector("#back-search").oninput = function () {
    let val = this.value.trim();
    let backSearchItems = document.querySelectorAll(".item-task");
    if (val != "") {
      backSearchItems.forEach(function (el) {
        if (el.innerText.toUpperCase().search(val.toUpperCase()) == -1) {
          el.classList.add("hide");
        } else {
          el.classList.remove("hide");
        }
      });
    } else {
      backSearchItems.forEach(function (el) {
        el.classList.remove("hide");
      });
    }
  };

  await getUsers();
  let num = [];

  for (key in arrTasks) {
    if (arrTasks[key].executor != null) {
      for (i in arrUsers) {
        if (arrTasks[key].executor == arrUsers[i].id) {
          console.log(arrUsers[i]);
          console.log(arrTasks[key]);
          let nameItem = document.getElementById(`${cID}${arrUsers[i].id}`);
          console.log("ok", `${cID}${arrUsers[i].id}`, arrTasks[key].subject);

          num.push(arrTasks[key].executor);
          if (
            num.filter((item) => item === arrTasks[key].executor).length > 1
          ) {
            nameItem.innerHTML += ``;
          } else {
            nameItem.innerHTML += `<ul class="chart-row-bars">
            <li class="chart-li-two-a" title="${arrTasks[key].subject}">${arrTasks[key].subject}</li>
            </ul>`;
          }
        }
      }
    }
  }

  console.log(num);
  console.log(backlist);
  console.log(arrTasks);

  const place = document.querySelector(".chart");
  const taskItem = document.querySelector(".js-card");

  place.ondragover = allowDrop;

  function allowDrop(ev) {
    ev.preventDefault();
  }

  taskItem.ondragstart = dragn;

  function dragn(ev) {
    ev.dataTransfer.setData("id", ev.target.id);
  }

  place.ondrop = drop;

  function drop(ev) {
    let itemId = ev.dataTransfer.getData("id");
    ev.target.append(document.getElementById(itemId));
    document.getElementById(`${itemId}`).classList.add('afterDrop')
    console.log(itemId);
  }
}

getTasks();
setDates(dateDelta);
