import "./App.css";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import * as BooksAPI from "./BooksAPI";
import Search from "./components/Search";
import { Route, Routes } from "react-router-dom";

function App() {
  const [books, setBooks] = useState([]);
  const [mapOfIdToBooks, setMapOfIdToBooks] = useState(new Map());

  const createMapOfBooks = (books) => {
    const map = new Map();
    books.map((book) => map.set(book.id, book));
    return map;
  };
  useEffect(() => {
    BooksAPI.getAll().then((res) => {
      setBooks(res);
      setMapOfIdToBooks(createMapOfBooks(res));
    });
  }, []);

  const onBookShelfChange = (book, whereTo) => {
    let id = book?.id;

    const updatedBooks = books.map((book) => {
      if (id === book.id) {
        book.shelf = whereTo;
        return book;
      }
      return book;
    });
    if (!mapOfIdToBooks.has(book.id)) {
      book.shelf = whereTo;
      updatedBooks.push(book);
    }
    setBooks(updatedBooks);

    BooksAPI.update(book, whereTo);
  };
  return (
    <div className="app">
      <Routes>
        <Route
          element={
            <Search
              books={books}
              onBookShelfChange={onBookShelfChange}
              createMapOfBooks={createMapOfBooks}
            />
          }
          path="/search"
        />

        <Route
          element={
            <HomePage books={books} onBookShelfChange={onBookShelfChange} />
          }
          path="/"
        />
      </Routes>
    </div>
  );
}

export default App;
