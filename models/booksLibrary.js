export class BooksLibrary {
    #library;
    constructor(library) {
        this.#library = library;
    }

    get library() {
        return this.#library;
    }

    addBookToLibrary(bookToAdd) {
        this.#library.push(bookToAdd);
    } 

    deleteBookToLibrary(bookId) {
        this.#library = this.#library.filter((element) => {
            return element.id !== bookId;
        });
    }

    setToggleReadStatus(bookId) {
        this.#library = this.#library.map((book) => {
            if (book.id == bookId) {
                book.toggleReadStatus();
            }
            return book;
        });
    }
}