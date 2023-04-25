// Book class
class Book {
    constructor(title, author) {
      this.title = title;
      this.author = author;
    }
  }
  
  // UI class
  class UI {
    static displayBooks() {
      const books = Store.getBooks();
      const bookList = document.getElementById('bookList');
      bookList.innerHTML = '';
  
      books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');
        bookElement.innerHTML = `
          <span><strong>Title:</strong> ${book.title}</span>
          <span><strong>Author:</strong> ${book.author}</span>
          <button class="delete">Remove</button>
        `;
        bookList.appendChild(bookElement);
      });
    }
  
    static addBook() {
      const titleInput = document.getElementById('titleInput');
      const authorInput = document.getElementById('authorInput');
      const title = titleInput.value.trim();
      const author = authorInput.value.trim();
  
      if (title === '' || author === '') {
        alert('Please enter a title and author.');
        return;
      }
  
      const book = new Book(title, author);
      Store.addBook(book);
      UI.displayBooks();
      titleInput.value = '';
      authorInput.value = '';
    }
  
    static removeBook(target) {
      if (target.classList.contains('delete')) {
        const bookElement = target.parentElement;
        const title = bookElement.querySelector('span:first-child').textContent.split(': ')[1];
        const author = bookElement.querySelector('span:nth-child(2)').textContent.split(': ')[1];
        const book = new Book(title, author);
        Store.removeBook(book);
        UI.displayBooks();
      }
    }
  }
  
  // Store class
  class Store {
    static getBooks() {
      let books = JSON.parse(localStorage.getItem('books'));
      return books ? books : [];
    }
  
    static addBook(book) {
      let books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removeBook(book) {
      let books = Store.getBooks();
      books = books.filter(currentBook => !(currentBook.title === book.title && currentBook.author === book.author));
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
  
  // Event listeners
  document.addEventListener('DOMContentLoaded', UI.displayBooks);
  
  const addBookForm = document.getElementById('addBookForm');
  addBookForm.addEventListener('submit', e => {
    e.preventDefault();
    UI.addBook();
  });
  
  const bookList = document.getElementById('bookList');
  bookList.addEventListener('click', e => {
    UI.removeBook(e.target);
  });