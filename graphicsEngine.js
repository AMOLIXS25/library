import { Book } from "./models/book.js";


export class GraphicsEngine {
    #booksLibrary;
    constructor(booksLibrary) {
        this.#booksLibrary = booksLibrary;
    }

    initialize() {
        this.initializeBookListContainer();
        this.initializeCreateNewBookButton();
        this.initializeValidateCreateBookFormButton();
        this.initializeCloseModalButton();
    }

    initializeCloseModalButton() {
        const closeModalButton = document.querySelector('.close-modal-button');
        closeModalButton.addEventListener('click', () => {
           this.closeModal();
        })
    }
    
    
    closeModal(){ 
        const modalFormBook = document.querySelector('dialog');
        modalFormBook.close();
    }

    initializeBookListContainer() {
        const booksListContainer = document.querySelector('.books-list-container');
        booksListContainer.innerHTML = '';
        this.#booksLibrary.library.forEach((book) => {
            const newBookCard = document.createElement('div');
            newBookCard.className = 'book-card';
            newBookCard.setAttribute('data-id', book.id);
            newBookCard.innerHTML = `
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <p class="book-pages">${book.pages}</p>
                <button class="btn btn-outline book-toggle-button-read">${book.read ? 'Read' : 'Not Read'}</button>
                <button class="btn btn-full delete-book-button">Delete</button>
            `;
            booksListContainer.appendChild(newBookCard);
            this.initiliazeDeleteBookButtonListener(book.id);
            this.initializeToggleStatusButtonListener(book.id);
        })
    }

    initializeCreateNewBookButton() {
        const createNewBookButton = document.querySelector('.create-new-book-button');
        createNewBookButton.addEventListener('click', () => {
            const modalFormBook = document.querySelector('dialog');
            modalFormBook.showModal();
        });
    }

    getBookFromInput() {
        const inputTitle = document.querySelector('#title').value;
        const inputAuthor = document.querySelector('#author').value;
        const inputPages = document.querySelector('#pages').value;
        const checkboxRead = document.querySelector('#read').checked;
        return new Book(inputTitle, inputAuthor, inputPages, checkboxRead);
    }

    resetCreateBookForm() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#pages').value = '';
        document.querySelector('#read').checked = false;
    }

    initializeValidateCreateBookFormButton() {
        const validateCreateBookFormButton = document.querySelector("button[type='submit']");
        validateCreateBookFormButton.addEventListener('click', (event) => {
            const newBookToCreate = this.getBookFromInput();
            this.#booksLibrary.addBookToLibrary(newBookToCreate); 
            this.initializeBookListContainer();
            event.preventDefault();
            this.closeModal();
            this.resetCreateBookForm();
        });
    } 

    initiliazeDeleteBookButtonListener(book_id) {
        const deleteButtonToInitializeFromBookCard = document.querySelector(`.book-card[data-id='${book_id}'] .delete-book-button`);
        deleteButtonToInitializeFromBookCard.addEventListener('click', () => {
            const idBookToDelete = deleteButtonToInitializeFromBookCard.parentElement.getAttribute('data-id');
            this.#booksLibrary.deleteBookToLibrary(idBookToDelete);
            this.initializeBookListContainer();
        });
    } 

    initializeToggleStatusButtonListener (book_id) {
        const toggleButtonFromBookCard = document.querySelector(`.book-card[data-id='${book_id}'] .book-toggle-button-read`);
        toggleButtonFromBookCard.addEventListener('click', () => {
            this.#booksLibrary.setToggleReadStatus(book_id);
            this.initializeBookListContainer();
        });
    }

}