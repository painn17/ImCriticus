import { StarIcon } from "./icons/icons";
function Rating({ children, pad, hasReviewed }) {
  return (
    <div className="relative h-14 z-50 ">
      <div
        className={
          "absolute flex gap-2 rounded-lg top-3 px-3 py-2 warning-text backdrop-blur-md bg-black " +
          pad
        }
      >
        <StarIcon
          strokeColor="var(--warning)"
          fill={hasReviewed ? "var(--warning)" : ""}
        />
        <div className="body-regular">{children}</div>
      </div>
    </div>
  );
}

export default Rating;
