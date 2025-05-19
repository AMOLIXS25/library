const myLibrary = [];


function Book(title, author, pages, read) {
    if (!new.target) throw Error('You should use new to create a new book !');
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


const addBookToLibrary = (title, author, pages, read) => {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
} 


const main = () => {
    addBookToLibrary('Think and grow rich', 'Napoleon Hill', 215, false);
    addBookToLibrary('How to win friends and influence people', 'Dale Carnegie', 355, true);
    console.log(myLibrary);
}


main();
