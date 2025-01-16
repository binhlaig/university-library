import React from "react";
import BookCard from "./BookCard";

interface props {
  title: string;
  books: Book[];
  containerClassName?: string;
}
const BookList = ({ title, books, containerClassName }: props) => {
  return (
    <section className={containerClassName}>
      <h2 className="text-xl font-bold">ကျော်ကြားသော စာအုပ်များ</h2>

      <ul className="book-list">
        {books.map((book) => (
          <BookCard key={book.title} {...book} />
        ))}
      </ul>
    </section>
  );
};

export default BookList;
