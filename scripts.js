let urlUsers =
  "https://varankin_dev.elma365.ru/api/extensions/2a38760e-083a-4dd0-aebc-78b570bfd3c7/script/users";
let urlTasks =
  "https://varankin_dev.elma365.ru/api/extensions/2a38760e-083a-4dd0-aebc-78b570bfd3c7/script/tasks";
let arrUsers;
let arrTasks;
let backlog;
let dateDelta = new Date();

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

function getDates(startDate, stopDate) {
  var dateArray = new Array();
  var currentDate = startDate;
  while (currentDate <= stopDate) {
      dateArray.push(new Date (currentDate));
      currentDate = currentDate.addDays(1);
  }
  return dateArray;
}

function setDates(currentDate) {
  let datesBlock = document.querySelector(".dates")
  let stopDate = currentDate.addDays(14)
  for (key of getDates(currentDate, stopDate)) {
    let month = key.getMonth() + 1
    datesBlock.innerHTML += `<span class="date-elem">${key.getDate() + '.' + (month < 10 ? '0' + month : month) }</span>`
  }
  console.log(datesBlock);
}

function btnRight (direction) {
  let datesBlock = document.querySelector(".dates")
  document.querySelectorAll(".date-elem").forEach((el) => {el.remove()})
  dateDelta = direction ? dateDelta.addDays(-15) : dateDelta.addDays(15)
  setDates(dateDelta)
}

async function getUsers() {
  let response = await fetch(urlUsers);
  arrUsers = await response.json();
  let key;
  let chart = document.querySelector(".chart")

  for (key in arrUsers) {
    chart.innerHTML += `<div class="chart-row">
    <div class="chart-row-item">${arrUsers[key].firstName}</div>
    </div>`
  }

  console.log(arrUsers);
}

async function getTasks() {
  let response = await fetch(urlTasks);
  arrTasks = await response.json();
  let key;
  let backlist = document.querySelector(".back-list");
  let iter = 0

  for (key in arrTasks) {
    if (arrTasks[key].executor == null) {
      backlist.innerHTML += `<div class="item-task" id="${iter++}">
      <p class="back-title">${arrTasks[key].subject}</p>
      <p class="back-subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>`;
    }
  }

  document.querySelector('#back-search').oninput = function () {
    let val = this.value.trim()
    let backSearchItems = document.querySelectorAll('.item-task')
    // console.log(backSearchItems);
    if (val != '') {
      backSearchItems.forEach(function(el) {
        if (el.innerText.toUpperCase().search(val.toUpperCase()) == -1) {
          el.classList.add('hide')
        }
        else {
          el.classList.remove('hide')
        }
      })
    }
    else {
      backSearchItems.forEach(function(el) {
        el.classList.remove('hide')
      })
    }
  }

  console.log(backlist);
  // console.log(list);
  console.log(arrTasks);
}

// console.log(arrTasks);
// console.log(this.arrTasks);

// window.onload = () => {
//   let input = document.querySelector('#back-search')
//   input.oninput = function() {
//     let inputValue = this.value.trim()
//     if (inputValue != '') {
//       arrTasks.foreach(el => {
//         if (el.innerText.search(inputValue) == -1) {
//           el.classList.add('hide')
//         }
//       })
//     }

//     console.log(inputValue);
//   }
// }

// function checkExecutor() {
//   // for(let i = 0; i < arrUsers.length; i++) {
//   //   if (arrUsers[i].executor == null) {
//   //     backlog[i] = arrUsers[i]
//   //   }
//   // }
//   // console.log(backlog)
//   console.log(arrUsers)
//   console.log(arrTasks)
//   // console.log(arrUsers.length)
// }

// setTimeout(checkExecutor, 2000)
setDates(dateDelta)
getUsers()
getTasks()

// checkExecutor()
// console.log(arrTasks)
