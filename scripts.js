let urlUsers =
  "https://varankin_dev.elma365.ru/api/extensions/2a38760e-083a-4dd0-aebc-78b570bfd3c7/script/users";
let urlTasks =
  "https://varankin_dev.elma365.ru/api/extensions/2a38760e-083a-4dd0-aebc-78b570bfd3c7/script/tasks";
let arrUsers;
let arrTasks;
let backlog;

async function getUsers() {
  // fetch(urlUsers)
  // .then((response) => {
  //   return response.json()
  // })
  // .then((users) => {
  //   return arrUsers = {...users}
  // })
  // .catch(function (error) {
  //   console.log(error)
  // })
  // let response = await fetch(urlUsers)
  // let content = await response.json()
  // let key
  // for (key in content) {
  //   console.log(content[key])
  // }

  let response = await fetch(urlUsers);
  arrUsers = await response.json();
  let key;
  let chart = document.querySelector(".chart")

  for (key in arrUsers) {
    // console.log(arrUsers[key]);
    chart.innerHTML += `<div class="chart-row">
    <div class="chart-row-item">${arrUsers[key].firstName}</div>
    </div>`
  }

  console.log(arrUsers);
}

async function getTasks() {
  // fetch(urlTasks)
  //   .then((response) => {
  //     arrTasks = response.json();
  //   })
  //   .then((tasks) => {
  //     for (let i = 0; i < tasks.length; i++) {
  //       arrUsers[i] = tasks[i]
  //     }
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  // fetch(urlTasks)
  // .then((response) => {
  //   return response.json()
  // })
  // .then((tasks) => {
  //   return arrTasks = {...tasks}
  //   // return console.log(arrUsers)
  // })
  // .catch(function (error) {
  //   console.log(error)
  // })

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

  let input = document.querySelector('#back-search');
  input.oninput = function () {
    let inputValue = this.value.trim();
    // let list = document.querySelectorAll('p.back-title, p.back-subtitle')

    console.log(inputValue)

    if (inputValue != '') {
      document.querySelectorAll('p.back-title').foreach(el => {
        if (el.innerText.search(inputValue) == -1) {
          el.classList.add("hide");
          document.getElementById('#iter').style="display: none"
        }
      });
    }
  };

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

getUsers()
getTasks();
// checkExecutor()
// console.log(arrTasks)
