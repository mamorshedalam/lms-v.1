// VARIABLES ASSIGN
let DATABASE = [];
let CATEGORY = [];
let AUTHOR = [];


// IN APP FUNCTIONS

// CREATE FILTER MENU
const createFilter = (div, dataList) => {
     const filterDiv = document.getElementById(div);

     dataList.forEach(data => {
          const item = document.createElement('li');
          item.innerHTML = `<li><a onclick="findData(this)" class="item">${data}</a></li>`;

          filterDiv.appendChild(item);
     })
}
// CREATE VIEW SECTION
const createView = (bookList) => {
     const view = document.getElementById('home-section');
     const table = view.querySelector('tbody');
     table.innerHTML = "";

     bookList.forEach((book, index) => {
          const field = document.createElement('tr');
          field.setAttribute('name', book._id);
          field.className = "item";
          field.innerHTML = `<td>${index + 1}</td>
                         <td>${book.name}</td>
                         <td>${book.author}</td>
                         <td>${book.category}</td>
                         <td><img src="${book.cover.url}" alt=""></td>
                         <td><a onclick="removeData(this)">&times;</a></td>`;

          table.appendChild(field);
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

// CONVERT IMG TO BIT64
function imgCovt(input) {
     const img = input.nextElementSibling;
     let reader = new FileReader();

     const file = input.files[0];
     reader.onload = () => {
          img.src = reader.result
     }
     reader.readAsDataURL(file);
}
// SECTION TOGGLE
function toggleView(section) {
     const toggleSection = document.getElementById(section);
     const allSection = document.querySelectorAll('main section');
     allSection.forEach(item => { item.className = 'hide'; });

     toggleSection.className = 'show';
}
// FIND DATA
function findData(btn) {
     const criteria = btn.innerText.toLowerCase();

     const items = DATABASE.filter(book => book.author == criteria || book.category == criteria);
     createView(items);
}
// ADD NEW FIELD
function addField(btn) {
     const table = btn.closest('tbody');
     const fieldCount = table.childElementCount;

     const newField = document.createElement('tr');
     newField.innerHTML = `<td>${fieldCount}</td>
                         <td><input type="text" placeholder="Book Name" class="book-name" required></td>
                         <td><input type="text" placeholder="Author Name" class="author-name" required></td>
                         <td><input type="text" placeholder="Book Category" class="category" required></td>
                         <td>
                              <input type="file" onchange="imgCovt(this)" required>
                              <img class="book-cover" src="" alt="Upload Image">
                         </td>
                         <td>
                              <a onclick="addField(this)">&plus;</a>
                              <a onclick="removeField(this)">&times;</a>
                         </td>`
     newField.className = "item";

     table.appendChild(newField);
}
// REMOVE FIELD
function removeField(btn) {
     const table = btn.closest('tbody');
     const fiendCount = table.childElementCount;

     if (fiendCount > 2) {
          btn.closest('tr').remove();

          const items = table.querySelectorAll('.item');
          items.forEach((item, index) => {
               item.children[0].innerText = index + 1
          })
     }
}
// REMOVE DATA
function removeData(btn) {
     removeField(btn);

     const book = btn.closest('.item').getAttribute('name');
     axios.delete('/api', { data: { id: book } })
          .then(({ data }) => {
               if (data.deletedCount == 1) { alert("Data has been deleted") }
          })
          .catch(err => { alert(err) })
}
// RELOAD VIEW SECTION
function reload() {
     createView(DATABASE);
}


// IN APP EVENTS

// UPLOAD BOOKS FORM
const bookUpload = document.querySelector('#upload-section form');
bookUpload.addEventListener('submit', (event) => {
     event.preventDefault();

     const bookName = bookUpload.querySelectorAll('.book-name');
     const authorName = bookUpload.querySelectorAll('.author-name');
     const category = bookUpload.querySelectorAll('.category');
     const bookCover = bookUpload.querySelectorAll('.book-cover');

     let bookList = [];
     for (let i = 0; i < bookName.length; i++) {
          const book = {
               name: bookName[i].value.toLowerCase(),
               author: authorName[i].value.toLowerCase(),
               category: category[i].value.toLowerCase(),
               cover: bookCover[i].src
          }
          bookList.push(book);
     }
     axios.post('/api', bookList)
          .then(({ status }) => {
               if (status == 200) {
                    alert("Data has been uploaded");
               }
          })
          .catch(err => { alert(err) })

     bookUpload.reset();

     const items = bookUpload.querySelectorAll('.item');
     for (let x = 1; x < items.length; x++) {
          items[x].remove();
     }
})
// DATA VIEW
window.onload = function () {
     axios.get('/api')
          .then(({ data }) => {
               if (data.length > 0) {
                    DATABASE = data;
                    createArrays(DATABASE);
                    createView(DATABASE);
                    createFilter("filter-author", AUTHOR);
                    createFilter("filter-category", CATEGORY);
               }
          })
          .catch(err => { alert(err) })
}