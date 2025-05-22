let myLibrary = [];


function Book(title, author, pages, read) {
    if (!new.target) throw Error('You should use new to create a new book !');
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.toggleReadStatus = () => {
        this.read = !this.read;
    };
}


const addBookToLibrary = ({title, author, pages, read}) => {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    initializeBookListContainer();
} 


const initializeBookListContainer = () => {
    const booksListContainer = document.querySelector('.books-list-container');
    booksListContainer.innerHTML = '';
    myLibrary.forEach((book) => {
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
        initiliazeDeleteBookButtonListener(book.id);
        initializeToggleStatusButtonListener(book.id);
    })
}


const initializeCreateNewBookButton = () => {
    const createNewBookButton = document.querySelector('.create-new-book-button');
    createNewBookButton.addEventListener('click', () => {
        const modalFormBook = document.querySelector('dialog');
        modalFormBook.showModal();
    });
}


const initializeCloseModalButton = () => {
    const closeModalButton = document.querySelector('.close-modal-button');
    closeModalButton.addEventListener('click', () => {
        closeModal();
    })
}


const closeModal = () => {
    const modalFormBook = document.querySelector('dialog');
    modalFormBook.close();
}


const initializeValidateCreateBookFormButton = () => {
    const validateCreateBookFormButton = document.querySelector("button[type='submit']");
    validateCreateBookFormButton.addEventListener('click', (event) => {
        const newBookToCreate = getBookFromInput();
        addBookToLibrary(newBookToCreate); 
        event.preventDefault();
        closeModal();
        resetCreateBookForm();
    });
} 


const resetCreateBookForm = () => {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
    document.querySelector('#read').checked = false;
}


const getBookFromInput = () => {
    const inputTitle = document.querySelector('#title').value;
    const inputAuthor = document.querySelector('#author').value;
    const inputPages = document.querySelector('#pages').value;
    const checkboxRead = document.querySelector('#read').checked;
    return new Book(inputTitle, inputAuthor, inputPages, checkboxRead);
}


const initiliazeDeleteBookButtonListener = (book_id) => {
    const deleteButtonToInitializeFromBookCard = document.querySelector(`.book-card[data-id='${book_id}'] .delete-book-button`);
    deleteButtonToInitializeFromBookCard.addEventListener('click', () => {
        const idBookToDelete = deleteButtonToInitializeFromBookCard.parentElement.getAttribute('data-id');
        deleteBookToLibrary(idBookToDelete);
    });
} 


const initializeToggleStatusButtonListener = (book_id) => {
    const toggleButtonFromBookCard = document.querySelector(`.book-card[data-id='${book_id}'] .book-toggle-button-read`);
    toggleButtonFromBookCard.addEventListener('click', () => {
        myLibrary = myLibrary.map((book) => {
            if (book.id == book_id) {
                book.toggleReadStatus();
            }
            return book;
        });
        initializeBookListContainer();
    });
}

const deleteBookToLibrary = (bookId) => {
    myLibrary = myLibrary.filter((element) => {
        return element.id !== bookId;
    });
    initializeBookListContainer();
}


const main = () => {
    initializeBookListContainer();
    initializeCreateNewBookButton();
    initializeCloseModalButton();
    initializeValidateCreateBookFormButton();
}


main();
