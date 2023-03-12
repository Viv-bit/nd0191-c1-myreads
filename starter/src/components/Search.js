import React, { useState, useEffect } from "react";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";
import { Link } from "react-router-dom";

const Search = ({ onBookShelfChange, books, createMapOfBooks }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [mergedBooks, setMergedBooks] = useState([]);
  const [mapOfIdToBooks, setMapOfIdToBooks] = useState(new Map());

  useEffect(() => {
    setMapOfIdToBooks(createMapOfBooks(books));
  }, [books, createMapOfBooks]);

  useEffect(() => {
    const combined = searchedBooks.map((book) => {
      if (mapOfIdToBooks.has(book.id)) {
        return mapOfIdToBooks.get(book.id);
      } else {
        return book;
      }
    });
    setMergedBooks(combined);
  }, [searchedBooks, mapOfIdToBooks]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value?.length > 0) {
      BooksAPI.search(e.target.value).then((res) => {
        if (res.error) {
          setSearchedBooks([]);
        } else {
          setSearchedBooks(res);
        }
      });
    } else {
      setSearchedBooks([]);
    }
  };

  return (
    <div>
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={searchQuery}
              name="searchQuery"
              onChange={(e) => handleChange(e)}
              placeholder="Search by title, author, or ISBN"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {mergedBooks?.map((book) => {
              return (
                <li key={book.id}>
                  <Book book={book} updateBookShelf={onBookShelfChange} />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Search;
