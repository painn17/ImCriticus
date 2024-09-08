"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { getSingleAnime } from "@/app/services/animeApi/animeApi";
import { useState, useEffect } from "react";
import { useUserAnimeActivity } from "@/app/services/strapi/userAnimeactions";
import WatchedButton from "@/app/components/watched";
import {
  AddIcon,
  StarIcon,
  ArrowRightIcon,
  CloseIcon,
  VideoTickIcon,
  TickIcon,
} from "@/app/components/ui/icons/icons";
import Rating from "@/app/components/ui/rating";
import LinkTo from "@/app/components/ui/link";
import CustomButton from "@/app/components/ui/button";
import RatingForm from "@/app/components/ratingForm";
import { useAuth } from "@/app/context/AuthContext";
import Review from "@/app/components/review";
import WantToWatchButton from "@/app/components/wantToWatch";
import { useUserActivity } from "@/app/services/strapi/useractions";
import { useModal } from "@/app/context/ModalContext";
import Select from "react-select";
import BackButton from "@/app/components/ui/back";
import CustomSelect from "@/app/components/ui/customSelect";
import Slider from "@/app/components/ui/slider";
import CustomSlider from "@/app/components/ui/slider";
import ImageWithModal from "@/app/components/ui/imageWthModal";
import { Badge, Skeleton } from "@mui/material";
import Loader from "@/app/components/ui/loader";
function AnimePage({ data }) {
  const { userData, isLogged, setUserData } = useAuth();
  const [anime, setAnime] = useState();
  const { showModal } = useModal();
  const [modalVisible, setModalVisible] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [iswatched, SetIsWatched] = useState(false);
  const [calcUserScore, setCalcUserScore] = useState();
  const [reviews, setReviews] = useState([]);
  const [reviewsSort, setReviewsSort] = useState("");
  const [isInWantToWatchList, SetisInWantToWatchList] = useState(false);
  const [order, setOrder] = useState(false);
  const params = useParams();
  const router = useRouter();
  const pathid = parseInt(params.animeId);
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#111827", // bg-slate-700
      color: "#F9FAFB", // text-gray-50
      borderColor: "#4b5563", // border-gray-600
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#F9FAFB", // text-gray-50
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#111827", // bg-slate-700
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#1F2937" : "#111827",
      color: "#F9FAFB", // text-gray-50
    }),
  };
  const { addFavoriteAnime, deleteFavoriteAnime, getUserAnimeReviews } =
    useUserAnimeActivity();
  const { updateUserData } = useUserActivity();
  const reviewSort = [
    { value: "score", label: "Anime Rate" },
    // { value: "publishedAt", label: "Date Published" },
    // { value: "reviewRateUp ", label: "Review Rating" },
  ];
  const fetchAnime = async () => {
    const animeData = await getSingleAnime(pathid);
    console.log("loading anime", animeData);
    setAnime(animeData.data.attributes);
  };
  useEffect(() => {
    fetchAnime();
  }, [pathid]);

  useEffect(() => {
    if (anime?.reviews?.data.length > 0) {
      let calculate = anime.reviews.data.reduce(
        (acc, current) => acc + current.attributes.score,
        0
      );
      calculate = calculate / anime.reviews.data.length;
      setCalcUserScore(calculate);
    }
  }, [anime]);

  const getReview = async (side) => {
    console.log(userData, pathid);
    try {
      const response = await getUserAnimeReviews(
        null,
        pathid,
        reviewsSort,
        side
      );
      console.log(response);
      setReviews(response.data.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    const reviewed = userData?.reviews.some((item) => {
      return item.anime.id === pathid;
    });
    setHasReviewed(reviewed);
    console.log(hasReviewed);
  }, [anime, userData]);

  useEffect(() => {
    const side = order ? "asc" : "desc";

    getReview(side);
    console.log(reviews, userData?.animeWatched, userData?.wantToWatch, pathid);
  }, [userData, pathid, reviewsSort, order]);

  useEffect(() => {
    const hasWatched = userData?.animeWatched.some(
      (anime) => anime.id === pathid
    );
    const hasInWantToWatchList = userData?.wantToWatch.some(
      (anime) => anime.id === pathid
    );
    if (hasWatched) {
      SetIsWatched(true);
    } else {
      SetIsWatched(false);
    }
    if (hasInWantToWatchList) {
      SetisInWantToWatchList(true);
    } else {
      SetisInWantToWatchList(false);
    }
    console.log(hasWatched, hasInWantToWatchList);
  }, [userData, anime]);

  useEffect(() => {
    const checkIfReviewed = async () => {
      if (userData && userData.id) {
        const response = await getUserAnimeReviews(userData.id, pathid);
        console.log(response);

        if (response.data.data.length > 0) {
          setHasReviewed(true);
        } else {
          setHasReviewed(false);
        }
      }
    };
    checkIfReviewed;
  }, [reviews]);

  const handleAddFavoriteAnime = async () => {
    const data = await addFavoriteAnime(pathid);
    console.log(data);
    const update = await updateUserData();
    setUserData(update);
  };
  const handleDeleteFavoriteAnime = async () => {
    const data = await deleteFavoriteAnime(pathid);
    console.log(data);
    const update = await updateUserData();
    setUserData(update);
  };
  const handleSortingReviewChange = (event) => {
    const { value } = event;
    console.log(value);

    setReviewsSort(value);
  };

  return (
    <div>
      {anime ? (
        <div className="flex flex-col gap-8">
          <div className="w-fit">
            <BackButton></BackButton>
          </div>
          <div className="py-20">
            <div className="relative ">
              <div className="">
                {anime?.image_landscape?.data?.attributes?.url ? (
                  <img
                    className=" h-full w-full select-none rounded-[40px] max-md:hidden"
                    src={`http://localhost:1337${anime?.image_landscape?.data?.attributes?.url}`}
                    alt=""
                  />
                ) : (
                  <Skeleton></Skeleton>
                )}
                <div className="flex gap-2 max-md:w-full absolute p-10 max-md:p-5 -bottom-10 left-[14%] max-md:left-0  max-md:flex max-md:bottom-auto rounded-3xl bg-gray-800 bg-opacity-65 backdrop-blur-sm ">
                  <div className="mx-auto">
                    <h3 className="heading-three text-gray-50">
                      {anime?.name}
                    </h3>
                    <div>
                      {userData ? (
                        userData.favorite_anime ? (
                          <CustomButton width="fit" buttonstyle={false}>
                            <div className="heading-six warning-text flex items-center gap-1 ">
                              {userData?.favorite_anime.id === pathid ? (
                                <div className="favorite ">
                                  <div className="flex gap-1 favorite-1">
                                    <StarIcon
                                      strokeColor="var(--warning)"
                                      fill="var(--warning)"
                                    ></StarIcon>
                                    <div>Your favorite</div>
                                    <div className="body-small text-gray-500">
                                      {navigator.maxTouchPoints ||
                                      "ontouchstart" in document.documentElement
                                        ? "(tap to delete)"
                                        : "(click to delete)"}
                                    </div>
                                  </div>
                                  <div className="favorite-2 hidden w-full">
                                    <CustomButton
                                      callback={() => {
                                        handleDeleteFavoriteAnime();
                                      }}
                                      buttonstyle={false}
                                    >
                                      <div className="gap-1 flex error-text">
                                        <CloseIcon
                                          strokeColor="var(--error)"
                                          fill="var(--error)"
                                        ></CloseIcon>
                                        <div>Delete</div>
                                      </div>
                                    </CustomButton>
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  <div>You allready have a favorite anime</div>
                                </div>
                              )}
                            </div>
                          </CustomButton>
                        ) : (
                          <CustomButton
                            callback={() => {
                              handleAddFavoriteAnime();
                            }}
                            height="h-min"
                            buttonstyle={false}
                          >
                            <div className="heading-five warning-text flex items-center gap-1">
                              <StarIcon strokeColor="var(--warning)"></StarIcon>
                              <div>Add to favorite</div>
                            </div>
                          </CustomButton>
                        )
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid max-md:flex max-md:flex-col grid-cols-9 gap-20 text-gray-50 relative">
            <div className="flex flex-col gap-4 col-span-3 max-lg:col-span-4 ">
              <img
                className=" select-none rounded-[40px] max-lg:max-h-[66%]"
                src={`http://localhost:1337${anime?.image.data.attributes.url}`}
                alt=""
              />
              {isLogged ? (
                <div>
                  <div className="flex flex-col gap-2 w-full  mx-auto  rounded-lg p-2 bg-blur bg-gray-950 bg-opacity-10">
                    <div className=" mx-auto">
                      {anime?.status === "Released" ? (
                        <WatchedButton
                          id={pathid}
                          iswatched={iswatched}
                        ></WatchedButton>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="mx-auto">
                      <WantToWatchButton
                        id={pathid}
                        iswatched={iswatched}
                        isInWantToWatchList={isInWantToWatchList}
                      ></WantToWatchButton>
                    </div>
                    {userData ? (
                      anime?.status === "Released" ? (
                        hasReviewed ? (
                          <div className="text-[var(--success)] mx-auto flex ">
                            <TickIcon strokeColor="var(--success)"></TickIcon>
                            <div>You already reviewed this</div>
                          </div>
                        ) : iswatched ? (
                          <CustomButton
                            buttonstyle={false}
                            callback={() =>
                              showModal(
                                <RatingForm
                                  modalVisible={modalVisible}
                                  setModalVisible={setModalVisible}
                                  animeid={pathid}
                                  setHasReviewed={setHasReviewed}
                                  reloadAnimeFunction={(side) => {
                                    getReview(side);
                                  }}
                                ></RatingForm>
                              )
                            }
                          >
                            <div className="flex items-center justify-center gap-4 heading-four">
                              <AddIcon strokeColor="var(--primary)"></AddIcon>
                              <div>Add a review</div>
                            </div>
                          </CustomButton>
                        ) : (
                          <div className="mx-auto">
                            Watch the anime to leave a review
                          </div>
                        )
                      ) : (
                        <div className="text-[var(--warning)] heading-four mx-auto">
                          Not released yet
                        </div>
                      )
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col col-span-6 max-lg:col-span-5 gap-4">
              <h4 className="heading-four">{anime.label}</h4>
              <div className="body-large whitespace-break-spaces">
                {anime?.description}
              </div>
              <div className="flex flex-col items-start ">
                <div className="flex flex-col items-start ">
                  <div className="body-regular text-gray-400">
                    Critic score:
                  </div>{" "}
                  <Rating>{anime.score}</Rating>
                </div>
                {calcUserScore ? (
                  <div className="flex flex-col items-start ">
                    <div className="body-regular text-gray-400">
                      User score:
                    </div>
                    <Rating hasReviewed={hasReviewed}>{calcUserScore}</Rating>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {anime.genre ? (
                <div className="flex flex-col gap-2">
                  <div className="body-regular text-gray-400">Genres:</div>
                  <div className="body-large max-lg:body-regular text-gray-100 flex gap-2 max-md:grid max-md:grid-cols-3 text-center">
                    {anime.genre.map((item) => {
                      return (
                        <LinkTo href={`/anime?genre=${item}`}>
                          <div className="rounded bg-gray-400 bg-opacity-30 p-1  ">
                            {item}
                          </div>
                        </LinkTo>
                      );
                    })}
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="flex flex-col gap-6 ">
                <div className="flex flex-row gap-6">
                  <div className="flex flex-col gap-2">
                    <div className="body-regular text-gray-400">Type:</div>
                    <div className="body-large text-gray-100">
                      {anime?.kind}
                    </div>
                  </div>
                  {anime?.release_date ? (
                    <div className="flex flex-col gap-2">
                      <div className="body-regular text-gray-400">
                        Release date:
                      </div>
                      <div className="body-large text-gray-100">
                        {anime?.release_date}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-row gap-6">
                  <div className="flex flex-col gap-2">
                    <div className="body-regular text-gray-400">Status:</div>
                    <div className="body-large text-gray-100">
                      {anime?.status}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="body-regular text-gray-400">Episodes:</div>
                    <div className="body-large text-gray-100">
                      {anime?.episodes}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {anime.illustrations?.data ? (
            <div className="flex flex-col px-2">
              {/* <div className="w-fit">
                <Badge
                  badgeContent={anime.illustrations?.data.length}
                  color="primary"
                > */}
              <div className="body-large text-gray-50 flex items-center gap-2">
                Illustrations
                <div className="text-gray-500 body-regular">
                  ({anime.illustrations?.data.length})
                </div>
              </div>
              {/* </Badge>
              </div> */}
              <div className="bg-gray-500 py-4 px-16 rounded-xl bg-opacity-10">
                <CustomSlider infinite={true}>
                  {anime.illustrations?.data.map((item) => {
                    return (
                      <div className=" p-2">
                        <ImageWithModal url={`${item.attributes.url}`} />
                      </div>
                    );
                  })}
                </CustomSlider>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="flex flex-col gap-4 p-2">
            <div className="text-gray-50 body-large">Reviews</div>
            <div className="w-fit flex flex-row items-center gap-4">
              <div className="text-gray-50 body-large">Reviews sort:</div>
              <CustomSelect
                handler={(event) => {
                  handleSortingReviewChange(event);
                }}
                options={reviewSort}
              ></CustomSelect>
              <div className="flex flex-row items-center justify-center gap-4">
                {/* <div className="text-gray-50 ">Order: </div> */}
                <CustomButton buttonstyle={false}>
                  <div
                    onClick={() => {
                      setOrder(!order);
                    }}
                  >
                    <div className="rotate-90">
                      <div>
                        <ArrowRightIcon
                          strokeColor={order ? "white" : "var(--primary)"}
                        ></ArrowRightIcon>
                      </div>
                      <div className="rotate-180">
                        <ArrowRightIcon
                          strokeColor={order ? "var(--primary)" : "white"}
                        ></ArrowRightIcon>
                      </div>
                    </div>
                  </div>
                </CustomButton>
              </div>
            </div>

            {reviews.length >= 1 ? (
              <div className="gap-4 flex flex-col">
                {reviews.map((item) => {
                  return (
                    <Review
                      review={item.attributes}
                      reviewId={item.id}
                      user={userData}
                      isInUserProfile={false}
                    ></Review>
                  );
                })}
              </div>
            ) : (
              <div className="text-gray-50 mx-auto caption flex flex-col gap-4 items-center">
                <div>There is no reviews yet</div>
                {isLogged ? (
                  iswatched ? (
                    <>
                      <div>But you can be first</div>
                      <CustomButton
                        buttonstyle={false}
                        callback={() =>
                          showModal(
                            <RatingForm
                              modalVisible={modalVisible}
                              setModalVisible={setModalVisible}
                              animeid={pathid}
                              setHasReviewed={setHasReviewed}
                              reloadAnimeFunction={(side) => {
                                getReview(side);
                              }}
                            ></RatingForm>
                          )
                        }
                      >
                        <div className="flex items-center justify-center gap-4 heading-five">
                          <div>Add a review</div>
                        </div>
                      </CustomButton>
                    </>
                  ) : (
                    <div>Watch the anime to leave a review</div>
                  )
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <Loader loading={true}></Loader>
      )}
    </div>
  );
}

export default AnimePage;
