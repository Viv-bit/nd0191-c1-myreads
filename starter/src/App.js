import "./App.css";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import * as BooksAPI from "./BooksAPI";
import Search from "./components/Search";
import { Route, Routes } from "react-router-dom";

function App() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    BooksAPI.getAll().then((res) => {
      console.log(res);
      setBooks(res);
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
    setBooks(updatedBooks);
    BooksAPI.update(book, whereTo);
  };
  return (
    <div className="app">
      <Routes>
        <Route
          element={
            <Search books={books} onBookShelfChange={onBookShelfChange} />
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
