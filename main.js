import { BooksLibrary } from "./models/booksLibrary.js";
import { GraphicsEngine } from "./graphicsEngine.js";


class Main {
    static main() {
        let booksLibrary = new BooksLibrary([]);
        let graphicsEngine = new GraphicsEngine(booksLibrary);
        graphicsEngine.initialize();
    }
}

Main.main();
