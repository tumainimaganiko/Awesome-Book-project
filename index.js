// Retrieve data from local storage
let books = JSON.parse(localStorage.getItem("books")) || [];

// Get HTML elements
const bookList = document.getElementById("book-list");
const addBookForm = document.getElementById("add-book-form");
const removeBookForm = document.getElementById("remove-book-form");

// Function to render the book list
function renderBookList() {
  // Clear the book list
  bookList.innerHTML = "";
  // Loop through the book array and create a new list item for each book
  books.forEach((book, index) => {
    const li = document.createElement("p");
    li.innerHTML = `${book.title} <br> ${book.author} <br> `;
    bookList.appendChild(li);
    // Add the book index as a data attribute to the list item for later use
    li.dataset.index = index;
    let p = document.createElement('hr');
    
    //add a remove button for each book
    removeButton = document.createElement("button");
    removeButton.innerHTML = "Remove";
    li.appendChild(removeButton);
    removeButton.addEventListener("click" , event => {
        const index = event.target.parentNode.dataset.index;
        removeBook(index);
        renderBookList();
    });
    li.appendChild(p);
  });
}

// Function to add a new book to the collection
function addBook(title, author) {
  books.push({title: title, author: author});
  localStorage.setItem("books", JSON.stringify(books));
}

// Function to remove a book from the collection
function removeBook(index) {
  books = books.filter((book, i) => i != index);
  localStorage.setItem("books", JSON.stringify(books));
}