// VARIABLES ASSIGN



// FUNCTIONS
const createView = (bookList) => {
     const view = document.getElementById('home-section');
     const table = view.querySelector('tbody');


     bookList.forEach((book, index) => {
          const newField = document.createElement('tr');
          newField.innerHTML = `<td>${index + 1}</td>
                         <td>${book.name}</td>
                         <td>${book.author}</td>
                         <td>${book.category}</td>
                         <td><img src="assets/img/robindonath-ekhane-kkhono-khete-asenni.jpg" alt=""></td>
                         <td><a onclick="removeData(this)">&times;</a></td>`
          newField.className = "item";
          newField.setAttribute('name', book._id);

          table.appendChild(newField);
     })
}

// SECTION TOGGLE
function toggleView(section) {
     const toggleSection = document.getElementById(section);
     const allSection = document.querySelectorAll('main section');
     allSection.forEach(item => { item.className = 'hide'; });

     toggleSection.className = 'show';
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
                         <td><input type="file" class="book-cover" required></td>
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

          const allFields = table.querySelectorAll('.item');
          allFields.forEach((item, index) => {
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
               if(deletedCount == 1){alert("Data has been deleted")}
          })
          .catch(err => { alert(err) })
}

// FORM FILL UP
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
               name: bookName[i].value,
               author: authorName[i].value,
               category: category[i].value,
               // cover: bookCover[i].value
          }
          bookList.push(book);
     }
     axios.post('/api', bookList)
          .then(({ data }) => {
               if (data.length > 0) { alert("Data has been uploaded") }
          })
          .catch(err => { alert(err) })
     bookUpload.reset();
})

// DATA VIEW
window.onload = function () {
     axios.get('/api')
          .then(({ data }) => {
               if (data.length > 0) {
                    createView(data)
               }
          })
          .catch(err => { alert(err) })
}