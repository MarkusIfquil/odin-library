class Book {
    constructor(title, author, pages, read) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

class Library {
    Books = [];

    addBook(title, author, pages, read) {
        let book = new Book(title, author, pages, read);
        this.Books.push(book);
    }
    removeBook(id) {
        for (const book of this.Books) {
            if (book.id == id) {
                this.Books.splice(this.Books.indexOf(book), 1);
            }
        }
    }

}

class Display {
    static createChildAndAppendIt(className, content, parent) {
        let child = document.createElement('div');
        child.textContent = content;
        child.className = className;
        parent.appendChild(child);
    }

    static displayBooks() {
        let cardContainer = document.querySelector('.card-container');
        cardContainer.innerHTML = '';
        for (const book of myLibrary.Books) {
            let card = document.createElement('div');
            card.className = 'card';

            Display.createChildAndAppendIt('title', `${book.title}`, card);
            Display.createChildAndAppendIt('author', `by ${book.author}`, card);
            Display.createChildAndAppendIt('pages', `${book.pages} pages`, card);

            let readButton = document.createElement('button');
            readButton.className = 'readButton';
            readButton.textContent = book.read ? 'read' : 'haven\'t read yet';
            readButton.style.backgroundColor = book.read ? 'var(--ctp-mocha-green)' : 'var(--ctp-mocha-red)';
            readButton.addEventListener('click', () => {
                book.read = !book.read;
                readButton.textContent = book.read ? 'read' : 'haven\'t read yet';
                readButton.style.backgroundColor = book.read ? 'var(--ctp-mocha-green)' : 'var(--ctp-mocha-red)';
            });
            card.appendChild(readButton);

            let removeButton = document.createElement('button');
            removeButton.className = 'removeButton';
            removeButton.textContent = 'remove book';
            removeButton.addEventListener('click', () => {
                myLibrary.removeBook(book.id);
                Display.displayBooks();
            });
            card.appendChild(removeButton);

            // console.log(card);
            cardContainer.appendChild(card);
        }
    }
    static submitForm(event) {
        event.preventDefault();
        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').value;
        const pages = document.querySelector('#pages').value;
        const read = document.querySelector('#read').checked;
        console.log("AAA");

        myLibrary.addBook(title, author, pages, read);
        dialog.close();
        Display.displayBooks();
    }
}

function onAuthor() {
  const author = document.querySelector("#author");
  if(author.validity.valueMissing) {
    author.setCustomValidity("the author name must be filled");
  }
  else {
    author.setCustomValidity("");
  }
}

const author = document.querySelector("#author");
const submitButton = document.querySelector("#submitButton");
author.addEventListener("input",onAuthor);
submitButton.addEventListener("click",onAuthor);

let myLibrary = new Library();

let dialog = document.querySelector("dialog");
let addBookButton = document.querySelector('#addBook');
let form = document.querySelector('form');

addBookButton.addEventListener('click', () => {
    dialog.showModal();
    form.reset();
});
form.addEventListener('submit', Display.submitForm);

Display.displayBooks();