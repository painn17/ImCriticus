import { useState } from "react";
import { StarIcon } from "./icons/icons";

const RatingInput = ({ onRatingChange, rating, setRating }) => {
  const handleRating = (newRating) => {
    setRating(newRating);
    console.log(rating);
    // onRatingChange(newRating);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex">
        {[...Array(10)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <span
              key={ratingValue}
              className={`cursor-pointer  text-3xl hover:text-[--warning]`}
              onClick={() => handleRating(ratingValue)}
            >
              <StarIcon
                strokeColor={rating >= ratingValue ? "var(--warning)" : "gray"}
              ></StarIcon>
            </span>
          );
        })}
      </div>
      <div className="warning-text body-large">{rating}</div>
    </div>
  );
};

export default RatingInput;
