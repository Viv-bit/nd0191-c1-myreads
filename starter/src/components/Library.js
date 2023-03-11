import React from "react";
import Shelf from "./Shelf";

export default function Library({ bookList, onBookShelfChange }) {
  const WantToRead = bookList?.filter((book) => book?.shelf === "wantToRead");
  const CurrentlyReading = bookList?.filter(
    (book) => book.shelf === "currentlyReading"
  );
  const Read = bookList?.filter((book) => book.shelf === "read");

  return (
    <div>
      <Shelf
        title="Currently Reading"
        bookList={CurrentlyReading}
        onBookShelfChange={onBookShelfChange}
      />
      <Shelf
        title="Want to Read"
        bookList={WantToRead}
        onBookShelfChange={onBookShelfChange}
      />
      <Shelf
        title="Read"
        bookList={Read}
        onBookShelfChange={onBookShelfChange}
      />
    </div>
  );
}
