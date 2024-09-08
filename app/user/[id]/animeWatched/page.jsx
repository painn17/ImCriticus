"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import LinkTo from "@/app/components/ui/link";
import AnimeCard from "@/app/components/animeCard";
import { useParams, useRouter } from "next/navigation";
import { ArrowRightIcon } from "@/app/components/ui/icons/icons";
import { getSingleAnime } from "@/app/services/animeApi/animeApi";
import { useUserActivity } from "@/app/services/strapi/useractions";
import CustomButton from "@/app/components/ui/button";
import Review from "@/app/components/review";
import UserImage from "@/app/components/ui/userImage";
import BackButton from "@/app/components/ui/back";

function UserInfo() {
  /// СНЕСТИ ВСЁ, ОТДЕЛЬНЫЕ СТРАНИЦЫ
  const { isLogged, userData, setUserData } = useAuth();
  const { getUser } = useUserActivity();
  const params = useParams();
  console.log(params);
  const router = useRouter();

  console.log(params);
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    const fetchData = async () => {
      console.log(params.id);
      try {
        const response = await getUser(params.id);
        setUserInfo(response);
        console.log(userInfo);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchData();
  }, [userData]);

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
                <div>'s watched anime</div>
              </div>
            </div>
            <div className="pt-4 grid  sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-9  xl:grid-cols-12 gap-6">
              {userInfo ? (
                userInfo.animeWatched.map((item) => {
                  return (
                    <AnimeCard
                      key={item.id}
                      id={item.id}
                      cardWithButton={true}
                      iswatched={userInfo.id === userData?.id ? true : false}
                      isManagable={true}
                    ></AnimeCard>
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

export default UserInfo;
