import React from "react";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { BookOpen } from "lucide-react";
import BookCover from "./BookCover";

const BookOverview = ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
}: Book) => {
  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1>{title}</h1>
        <div className="book-info">
          <p>
            By <span className="font-semibold text-blue-800">{author}</span>
          </p>
          <p>
            Category{" "}
            <span className="font-semibold text-blue-800">{genre}</span>
          </p>
          <div className="flex flex-row gap-1">
            <Star size={22} />
            <p>{rating}</p>
          </div>
          <div className="book-copies">
            <p>
              Total Books : <span className="text-blue-800">{totalCopies}</span>
            </p>
            <p>
              Available Books :{" "}
              <span className="text-blue-800">{availableCopies}</span>
            </p>
          </div>
          <p className="book-description">{description}</p>
          <Button className="book-overview_btn">
            <BookOpen size={30} />
            <p className="font-bebas-neue text-border">ငှားရန်....</p>
          </Button>
        </div>
      </div>
      <div className="relative flex flex-1 justify-between">
        <div className="relative">
          <BookCover
            coverColor={coverColor}
            coverImage={coverUrl}
            className="z-10"
            variant="wide"
          />
           <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
            <BookCover
              variant="wide"
              coverColor={coverColor}
              coverImage={coverUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
