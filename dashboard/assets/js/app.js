// VARIABLES ASSIGN

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
               cover: bookCover[i].value
          }
          bookList.push(book);
     }
     console.log(bookList);
     bookUpload.reset();
})