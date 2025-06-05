export class Book {
    #id;
    #title;
    #author;
    #pages;
    #read;
    constructor (title, author, pages, read) {
        this.#id = crypto.randomUUID();
        this.#title = title;
        this.#author = author;
        this.#pages = pages;
        this.#read = read;
    }

    get id() {
        return this.#id;
    }

    get title() {
        return this.#title;
    }

    get author() {
        return this.#author;
    }

    get pages() {
        return this.#pages;
    }

    get read() {
        return this.#read;
    }

    toggleReadStatus() {
        this.#read = !this.#read;
    }
}