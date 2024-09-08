import CustomButton from "./ui/button";
import CustomInput from "./ui/input";
import RatingInput from "./ui/ratinginput";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useUserAnimeActivity } from "../services/strapi/userAnimeactions";
import { useSnackbar } from "../context/SnackBarContext";
import { useModal } from "../context/ModalContext";
function RatingForm({
  modalVisible,
  setModalVisible,
  animeid,
  reloadAnimeFunction,
  setHasReviewed,
}) {
  const { addReview } = useUserAnimeActivity();
  const { hideModal } = useModal();
  const [reviewText, setReviewText] = useState("");
  const { showSnackbar } = useSnackbar();
  const [rating, setRating] = useState(0);
  const handleInputChange = (e) => {
    const { value } = e.target;
    setReviewText(value);
  };
  const handleRatingChange = (e) => {
    const { value } = e.target;
    setRating(value);
  };
  const { userData } = useAuth();
  const handleAddReview = async () => {
    if (rating === 0 || reviewText.length < 10) {
      showSnackbar("Incorrect data", "error");
    } else {
      const response = await addReview(reviewText, rating, animeid);
      console.log(response);
      hideModal();
      reloadAnimeFunction();
      setHasReviewed(true);
    }
  };
  return (
    <div className="flex flex-col gap-4 p-4 items-center  rounded-xl">
      <CustomInput
        value={reviewText}
        inputname={"reviewText"}
        handleValueChange={handleInputChange}
        area={true}
        placeholder={"Write your opinion (30 characters minimum )"}
      ></CustomInput>
      <RatingInput
        rating={rating}
        setRating={setRating}
        onRatingChange={() => handleRatingChange}
      ></RatingInput>
      <CustomButton
        callback={() => {
          handleAddReview();
        }}
        buttonstyle={false}
      >
        Submit
      </CustomButton>
    </div>
  );
}

export default RatingForm;
