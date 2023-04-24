// Retrieve data from local storage
let books = JSON.parse(localStorage.getItem('books')) || [];

// Get HTML elements
const bookList = document.getElementById('book-list');
const addBookForm = document.getElementById('add-book-form');

// Function to remove a book from the collection
function removeBook(index) {
  books = books.filter((books, i) => i.toString() !== index);
  localStorage.setItem('books', JSON.stringify(books));
}

// Function to render the book list
function renderBookList() {
  // Clear the book list
  bookList.innerHTML = '';
  // Loop through the book array and create a new list item for each book
  books.forEach((book, index) => {
    const li = document.createElement('p');
    li.innerHTML = `${book.title} <br> ${book.author} <br> `;
    bookList.appendChild(li);
    // Add the book index as a data attribute to the list item for later use
    li.dataset.index = index;
    const p = document.createElement('hr');

    // add a remove button for each book
    const removeButton = document.createElement('button');
    removeButton.innerHTML = 'Remove';
    li.appendChild(removeButton);
    removeButton.addEventListener('click', (event) => {
      const { index } = event.target.parentNode.dataset;
      removeBook(index);
      renderBookList();
    });
    li.appendChild(p);
  });
}

// Function to add a new book to the collection
function addBook(title, author) {
  books.push({ title, author });
  localStorage.setItem('books', JSON.stringify(books));
}

// Event listener for the add book form submission
addBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = addBookForm.title.value;
  const author = addBookForm.author.value;
  addBook(title, author);
  renderBookList();
  addBookForm.reset();
});

// Render the book list on page load
renderBookList();

document.querySelector('form').addEventListener('submit', () => {
  this.reset();
});
