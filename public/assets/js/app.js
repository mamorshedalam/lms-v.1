// VARIABLES ASSIGN
let DATABASE = [];
let CATEGORY = [];
let AUTHOR = [];


// IN APP FUNCTIONS

// CREATE LISTS FOR ITEMS
const createList = (item, lists) => {
     const ul = item.querySelector('ul');

     for (let i = 0; i < lists.length; i++) {
          const list = document.createElement('li');
          list.className = 'list-item';
          list.innerText = lists[i].name;

          ul.appendChild(list);
     }
}
// CREATE HOME SECTION
const createHome = (bookList) => {
     const view = document.getElementById('home-section');
     const container = view.querySelector('.container');


     bookList.forEach(book => {
          const item = document.createElement('div');
          item.className = "item";
          item.innerHTML = `<img src="${book.cover.url}" alt="">
                              <div class="text">
                                   <h2>${book.name}</h2>
                                   <p>Author: <span>${book.author}</span></p>
                                   <p>Category: <span>${book.category}</span></p>
                              </div>`;

          container.appendChild(item);
     })
}
// ASSIGN ARRAYS
const createArrays = (database) => {
     database.forEach(book => {
          const author = book.author;
          const category = book.category;

          if (!AUTHOR.includes(author)) {
               AUTHOR.push(author);
          }
          if (!CATEGORY.includes(category)) {
               CATEGORY.push(category);
          }
     })
}


// CALL FUNCTIONS

// SECTION TOGGLE
function toggleView(section) {
     const toggleSection = document.getElementById(section);
     const allSection = document.querySelectorAll('main section');
     allSection.forEach(item => { item.className = 'hide'; });

     toggleSection.className = 'show';
}
// CREATE SECTION
function createItem(section, criteria) {
     const targetSection = document.getElementById(section);
     const container = targetSection.querySelector('.container');

     criteria.forEach(item => {
          let books = DATABASE.filter(book => book.author == item || book.category == item);

          const field = document.createElement('div');
          field.className = 'item';
          field.innerHTML = `<h2>${item} <span>${books.length}</span></h2>
                              <ul></ul>`;

          createList(field, books);

          container.appendChild(field);
     })
}
// RELOAD VIEW SECTION
function reload(){
     createView(DATABASE);
}


// IN APP EVENTS

window.onload = function () {
     axios.get('/api')
          .then(({ data }) => {
               if (data.length > 0) {
                    DATABASE = data;
                    createArrays(DATABASE);
                    createHome(DATABASE);
               }
          })
          .catch(err => { alert(err) })
}