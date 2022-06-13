// SECTION TOGGLE
function toggleView(section) {
     const toggleSection = document.getElementById(section);
     const allSection = document.querySelectorAll('main section');
     allSection.forEach(item => { item.className = 'hide'; });

     toggleSection.className = 'show';
}

// FUNCTIONS
const createHome = (bookList) => {
     const view = document.getElementById('home-section');
     const container = view.querySelector('.container');


     bookList.forEach(book => {
          const newDiv = document.createElement('div');
          newDiv.innerHTML = `<img src="${book.cover.url}" alt="">
                              <div class="text">
                                   <h2>${book.name}</h2>
                                   <p>Author: <span>${book.author}</span></p>
                                   <p>Category: <span>${book.category}</span></p>
                              </div>`
          newDiv.className = "item";

          container.appendChild(newDiv);
     })
}

const createCategory = (bookList) => {
     bookList.forEach(book => {
          if (book.category == "Mystery") {

          }

     })
}

// DATA VIEW
window.onload = function () {
     axios.get('/api')
          .then(({ data }) => {
               if (data.length > 0) {
                    createHome(data);
                    createCategory(data);
               }
          })
          .catch(err => { alert(err) })
}