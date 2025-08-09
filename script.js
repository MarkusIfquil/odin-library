function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBook(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function removeBook(id) {
    for (const book of myLibrary) {
        if (book.id == id) {
            myLibrary.splice(myLibrary.indexOf(book), 1);
        }
    }
}

function createChildAndAppendIt(className, content, parent) {
    let child = document.createElement('div');
    child.textContent = content;
    child.className = className;
    parent.appendChild(child);
}

function displayBooks() {
    let cardContainer = document.querySelector('.card-container');
    cardContainer.innerHTML = '';
    for (const book of myLibrary) {
        let card = document.createElement('div');
        card.className = 'card';

        createChildAndAppendIt('title', book.title, card);
        createChildAndAppendIt('author', book.author, card);
        createChildAndAppendIt('pages', book.pages, card);
        createChildAndAppendIt('read', book.read, card);

        let removeButton = document.createElement('button');
        removeButton.className = 'removeButton';
        removeButton.textContent = 'remove book';
        removeButton.addEventListener('click', () => { removeBook(book.id); displayBooks(); });
        card.appendChild(removeButton);

        console.log(card);
        cardContainer.appendChild(card);
    }
}

function submitClick(event) {
    event.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read').checked;

    addBook(title, author, pages, read);
    dialog.close();
    displayBooks();
}

const myLibrary = [];

let dialog = document.querySelector("dialog");
let addBookButton = document.querySelector('#addBook');
let submitButton = document.querySelector('#submitButton');

addBookButton.addEventListener('click', () => dialog.showModal());
submitButton.addEventListener('click', submitClick);

displayBooks();
