import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Library from "../components/Library";
import * as BooksAPI from "../BooksAPI";
const HomePage = () => {
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
    BooksAPI.update(book, whereTo).then((res) => {
      console.log(res);
    });
  };
  return (
    <div className="list-books">
      <Header />

      <div className="list-books-content">
        <Library bookList={books} onBookShelfChange={onBookShelfChange} />
      </div>
    </div>
  );
};

export default HomePage;
