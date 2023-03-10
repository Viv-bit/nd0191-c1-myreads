import React from "react";
import Header from "../components/Header";
import Library from "../components/Library";
import { Link } from "react-router-dom";

const HomePage = ({ onBookShelfChange, books }) => {
  return (
    <div>
      <div className="list-books">
        <Header />

        <div className="list-books-content">
          <Library bookList={books} onBookShelfChange={onBookShelfChange} />
        </div>

        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
