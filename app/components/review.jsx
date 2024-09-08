import LinkTo from "./ui/link";
import { useAuth } from "../context/AuthContext";
import { StarIcon, LinkIcon, CloseIcon } from "./ui/icons/icons";
import { useUserActivity } from "../services/strapi/useractions";
import { useUserAnimeActivity } from "../services/strapi/userAnimeactions";
import { useEffect, useState } from "react";
import { getSingleAnime } from "../services/animeApi/animeApi";
import CustomButton from "./ui/button";
import { useSnackbar } from "../context/SnackBarContext";
function Review({ review, user, isInUserProfile = false, reviewId }) {
  const [deleteModal, setDeleteModal] = useState(false);
  const { userData, setUserData, isLogged } = useAuth();
  const [animeURL, setAnimeURL] = useState();
  const userIsOwner = userData?.id === (review.user?.id || review.user.data.id);
  const { updateUserData } = useUserActivity();
  const { showSnackbar } = useSnackbar();

  const { deleteReview, rateReview } = useUserAnimeActivity();
  const update = async () => {
    const data = await updateUserData();
    setUserData(data);
  };

  const handleDeleteReview = async () => {
    // setDeleteModal(true);
    // setTimeout(() => {
    //   setDeleteModal(false);
    // }, 3000); не работает правильно
    console.log(reviewId);

    const response = await deleteReview(reviewId);
    console.log(response);
    update();
  };

  const isLikedAllready = review.reviewRateUp?.data.some((item) => {
    return item.id === userData?.id;
  });
  const isDisLikedAllready = review.reviewRateDown?.data.some((item) => {
    return item.id === userData?.id;
  });

  const handleRateReview = async (rate) => {
    const response = await rateReview(reviewId, userData.id, rate);
    console.log(response, review);
    update();
  };

  useEffect(() => {
    const getAnimeImage = async () => {
      const response = await getSingleAnime(review.anime.data.id);
      setAnimeURL(response.data.attributes.image_landscape.data.attributes.url);
      console.log(animeURL);
    };
    if (isInUserProfile === true) {
      getAnimeImage();
    }
  }, [review]);

  return (
    <div className="col-span-1 mx-auto">
      <div
        style={
          isInUserProfile
            ? { backgroundImage: `url(http://localhost:1337${animeURL})` }
            : {}
        }
        className={`w-fit h-full rounded-lg bg-cover min-w-96 max-lg:min-w-72 ${
          isInUserProfile ? "" : "bg-blur"
        }`}
      >
        <div
          className={`flex flex-col h-full w-fit p-4 backdrop-blur-xl bg-slate-800 ${
            isInUserProfile ? "bg-opacity-50" : ""
          }  rounded-lg mx-auto min-w-96 max-lg:min-w-72 justify-between`}
        >
          <div className="flex flex-row items-center">
            <div className="text-gray-500 body-regular flex flex-col gap-1 ">
              {user ? (
                userIsOwner ? (
                  <div className="flex flex-row ">
                    <div className="">
                      {isInUserProfile ? (
                        ""
                      ) : (
                        <div className="text-gray-400"> (me) </div>
                      )}
                    </div>
                    <CustomButton
                      buttonstyle={false}
                      callback={() => {
                        handleDeleteReview();
                      }}
                    >
                      <div className="warning-text flex gap-1 items-center">
                        <CloseIcon strokeColor="var(--warning)"></CloseIcon>
                        <div>Delete review</div>
                      </div>
                    </CustomButton>
                  </div>
                ) : (
                  <div className="self-start flex gap-2 text-gray-50 items-center">
                    {isDisLikedAllready || isLikedAllready ? (
                      ""
                    ) : isLogged ? (
                      <CustomButton
                        buttonstyle={false}
                        callback={() => {
                          handleRateReview(false);
                        }}
                      >
                        <div className="error-text heading-three">-</div>
                      </CustomButton>
                    ) : (
                      ""
                    )}
                    <div className="flex flex-row items-center body-large gap-1">
                      <div>
                        {review.reviewRateUp?.data.length -
                          review.reviewRateDown?.data.length}
                      </div>
                      <StarIcon
                        strokeColor={`var(${
                          isLikedAllready
                            ? "--success"
                            : isDisLikedAllready
                            ? "--error"
                            : "--warning"
                        })`}
                        fill={`var(${
                          isLikedAllready
                            ? "--success"
                            : isDisLikedAllready
                            ? "--error"
                            : "--warning"
                        })`}
                      ></StarIcon>
                    </div>
                    {isDisLikedAllready || isLikedAllready ? (
                      ""
                    ) : isLogged ? (
                      <CustomButton
                        buttonstyle={false}
                        callback={() => {
                          handleRateReview(true);
                        }}
                      >
                        <div className="success-text heading-three">+</div>
                      </CustomButton>
                    ) : (
                      ""
                    )}
                  </div>
                )
              ) : (
                <div className="flex flex-row items-center body-large gap-1">
                  <div>
                    {review.reviewRateUp?.data.length -
                      review.reviewRateDown?.data.length}
                  </div>
                  <StarIcon
                    strokeColor={`var(${
                      isLikedAllready
                        ? "--success"
                        : isDisLikedAllready
                        ? "--error"
                        : "--warning"
                    })`}
                    fill={`var(${
                      isLikedAllready
                        ? "--success"
                        : isDisLikedAllready
                        ? "--error"
                        : "--warning"
                    })`}
                  ></StarIcon>
                </div>
              )}
              <div className="flex flex-col gap-2 justify-start">
                {isInUserProfile ? (
                  ""
                ) : (
                  <div className="w-fit">
                    <LinkTo
                      href={`/user/${review.user.id || review.user.data.id}`}
                    >
                      {review.user.username ||
                        review.user.data.attributes.username}
                      <LinkIcon></LinkIcon>
                    </LinkTo>
                  </div>
                )}
                {isInUserProfile ? (
                  review ? (
                    <div className="w-fit">
                      <LinkTo href={`/anime/${review.anime.data.id}`}>
                        {review.anime.data.attributes.name}
                        <LinkIcon></LinkIcon>
                      </LinkTo>
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </div>
              {/* {review.publishedAt}    дата публикации ревью */}
            </div>
          </div>
          <div className="flex flex-col gap-2 body-large text-gray-50 whitespace-break-spaces">
            <div>{review.review_text}</div>
            <div className="flex flex-col items-center">
              <div className="flex flex-row reviews-center justify-center gap-2">
                {review.score}
                <StarIcon strokeColor="var(--warning)"></StarIcon>
              </div>
              {userIsOwner ? (
                <div className="flex items-center gap-1">
                  <div>Review rating: </div>
                  {review.reviewRateUp?.data.length -
                    review.reviewRateDown?.data.length}
                  <StarIcon strokeColor="var(--warning)"></StarIcon>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
