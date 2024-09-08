"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import LinkTo from "@/app/components/ui/link";
import AnimeCard from "@/app/components/animeCard";
import { useParams, useRouter } from "next/navigation";
import { ArrowRightIcon } from "@/app/components/ui/icons/icons";
import { getSingleAnime } from "@/app/services/animeApi/animeApi";
import { useUserActivity } from "@/app/services/strapi/useractions";
import { useUserAnimeActivity } from "@/app/services/strapi/userAnimeactions";
import CustomButton from "@/app/components/ui/button";
import Review from "@/app/components/review";
import UserImage from "@/app/components/ui/userImage";
import BackButton from "@/app/components/ui/back";

function Reviews() {
  /// СНЕСТИ ВСЁ, ОТДЕЛЬНЫЕ СТРАНИЦЫ
  const { isLogged, userData, setUserData } = useAuth();
  const [reviews, setReviews] = useState([]);
  const params = useParams();
  const router = useRouter();
  const { getUser } = useUserActivity();
  const { getUserAnimeReviews } = useUserAnimeActivity();

  console.log(params);
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    console.log(userData);
    const fetchData = async () => {
      try {
        const response = await getUser(params.id);
        setUserInfo(response);
        console.log("abc", response.reviews);

        console.log(userInfo);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchData();
  }, [userData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserAnimeReviews(userInfo.id, null);
        setReviews(response.data.data);
        console.log("abc", response);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    fetchData();
  }, [userInfo]);

  // useEffect(() => {
  //   const checkReview = async () => {
  //       console.log(userData, pathid);
  //       try {
  //         const response = await getReview(userData.id, pathid);
  //         console.log(response);
  //         if (response.data.data.length > 0) {
  //           setHasReviewed(true);
  //         } else {
  //           setHasReviewed(false);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching reviews:", error);
  //       }
  //     };
  // checkReview()
  // }, [userInfo])

  return (
    <div>
      <div>
        <BackButton></BackButton>
        {userInfo ? (
          <>
            <div className="heading-one text-gray-50 flex items-center gap-2">
              <div className="flex flex-wrap">
                <div className="primary-text flex flex-row items-center gap-2">
                  <div className="w-16">
                    <UserImage url={userInfo.user_picture?.url}></UserImage>
                  </div>
                  {userInfo.username}
                </div>
                <div>'s reviews</div>
              </div>
            </div>
            <div className="flex flex-row flex-wrap py-8 gap-4 w-full justify-around">
              {userInfo ? (
                reviews.map((item) => {
                  return (
                    <Review
                      key={item.id}
                      user={userInfo}
                      review={item.attributes}
                      reviewId={item.id}
                      isInUserProfile={true}
                    ></Review>
                  );
                })
              ) : (
                <div className="heading-three text text-gray-50 col-span-full mx-auto bg-gray-800 bg-opacity-40 rounded-xl p-2 flex flex-col items-center gap-4 ">
                  <div>Nothing here</div>
                  <LinkTo href={""} className="cursor-pointer">
                    <div
                      className="text-[var(--primary)]"
                      onClick={() => {
                        router.back();
                      }}
                    >
                      <div className="flex gap-2">
                        <div className="rotate-180">
                          <ArrowRightIcon strokeColor="var(--primary)"></ArrowRightIcon>
                        </div>
                        <div>Go back</div>
                      </div>
                    </div>
                  </LinkTo>
                </div>
              )}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Reviews;
