"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useUserActivity } from "@/app/services/strapi/useractions";
import LinkTo from "@/app/components/ui/link";
import CustomButton from "@/app/components/ui/button";
import Review from "@/app/components/review";
import InfoCard from "@/app/components/ui/infoCard";
import UserImage from "@/app/components/ui/userImage";
import AnimeCard from "@/app/components/animeCard";
import {
  AddIcon,
  CloseIcon,
  VideoPlayIcon,
  ArrowRightIcon,
} from "@/app/components/ui/icons/icons";
import SuggestionForm from "@/app/components/suggestionForm";
import { useRouter } from "next/navigation";
import BackButton from "@/app/components/ui/back";
import { useModal } from "@/app/context/ModalContext";
function UserPage() {
  const path = usePathname();
  const id = path.replace("/user/", "");
  const {
    getUser,
    sendFriendsRequest,
    updateUserData,
    declineFriendsRequest,
    acceptFriendsRequest,
    deleteFriend,
  } = useUserActivity();
  const { userData, isLogged, setUserData } = useAuth();
  const [pageUserData, setPageUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [suggestVisible, setSuggestVisible] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [isRequestedIn, setIsRequestedIn] = useState(false);
  const [isRequestedOut, setIsRequestedOut] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [userActivityList, setUserActivityList] = useState(false);
  const router = useRouter();
  const { showModal, hideModal } = useModal();
  const getUserData = async () => {
    try {
      const response = await getUser(id);
      setPageUserData(response);
      console.log(userData.id, id);
      if (isLogged) {
        // Проверка, если это страница текущего пользователя
        if (id == userData.id.toString()) {
          setIsCurrentUser(true);
        }
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };
  useEffect(() => {
    console.log(userData, id, isLogged);
    getUserData();
  }, [id, userData]);

  useEffect(() => {
    const isFriendRequestIn = userData?.friends_request_in.some(
      (item) => item.id === pageUserData?.id
    );
    const isFriendRequestOut = userData?.friends_request_out.some(
      (item) => item.id === pageUserData?.id
    );
    const isInFriendsList = userData?.friends.some(
      (item) => item.id === pageUserData?.id
    );

    if (isFriendRequestIn) {
      setIsRequestedIn(true);
    } else {
      setIsRequestedIn(false);
    }
    if (isFriendRequestOut) {
      setIsRequestedOut(true);
    } else {
      setIsRequestedOut(false);
    }
    if (isInFriendsList) {
      setIsFriend(true);
    } else {
      setIsFriend(false);
    }
    setLoading(false);
    console.log(isRequestedIn, isRequestedOut);
  }, [pageUserData]);

  const handleAddFriend = async () => {
    const data = await sendFriendsRequest(pageUserData, userData.id);
    console.log(data);
    const update = await updateUserData();
    console.log(update);
    setUserData(update);
  };

  const handleDeleteFriend = async () => {
    const data = await deleteFriend(pageUserData, userData);
    const update = await updateUserData();
    setUserData(update);
    getUserData();
  };
  const handleAcceptFriend = async () => {
    const data = await acceptFriendsRequest(pageUserData, userData);
    const update = await updateUserData();
    setUserData(update);
    console.log(" friend accepted", data);
    getUserData();
  };
  const handleDeclineFriend = async () => {
    const data = await declineFriendsRequest(pageUserData, userData);
    console.log("friend decline", data);
    const update = await updateUserData();
    setUserData(update);
    getUserData();
  };
  const handleRequestDelete = async () => {
    const data = await declineFriendsRequest(userData, pageUserData);
    console.log("request to user deleted", data);
    const update = await updateUserData();
    setUserData(update);
    getUserData();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="">
      <div className="py-2">
        <BackButton></BackButton>
      </div>
      <div>
        {pageUserData ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-4 bg-slate-700 rounded-xl p-4 bg-opacity-40">
              <div className="h-[200px] w-[200px] rounded-full bg-gray-900 relative">
                <UserImage url={pageUserData.user_picture?.url}></UserImage>
              </div>
              <div className="flex flex-col gap-3 items-center justify-center">
                <div className="heading-two text-gray-50">
                  {pageUserData.username}
                </div>

                <div>
                  {isLogged ? (
                    isCurrentUser ? (
                      <div className="flex flex-col items-center gap-4 w-32">
                        <CustomButton>
                          <LinkTo href={"/user/dashboard"}>
                            <div className="mx-auto body-small">
                              Manage account
                            </div>
                          </LinkTo>
                        </CustomButton>
                      </div>
                    ) : isFriend ? (
                      <div className="">
                        <div className="flex flex-col gap-2">
                          <div className="flex bg-[var(--success)] items-center gap-1 text-gray-50 link-regular  p-1 rounded-lg justify-center">
                            <div>Your friend</div>

                            <div className="w-fit ">
                              <CustomButton
                                callback={() => {
                                  handleDeleteFriend();
                                }}
                                buttonstyle={false}
                              >
                                <CloseIcon strokeColor="var(--warning)"></CloseIcon>
                              </CustomButton>
                            </div>
                          </div>
                          <div className="">
                            <CustomButton
                              callback={() => {
                                showModal(
                                  <SuggestionForm
                                    setVisible={hideModal}
                                    friendData={pageUserData}
                                  >
                                    {pageUserData.username}
                                  </SuggestionForm>
                                );
                              }}
                            >
                              <div className="text-gray-50 p-1 flex gap-1 items-center">
                                <div>Suggest to watch</div>
                                <VideoPlayIcon strokeColor="#f9fafb"></VideoPlayIcon>
                              </div>
                            </CustomButton>
                          </div>
                        </div>
                      </div>
                    ) : isRequestedIn ? (
                      <div className="text-gray-50 link-regular bg-[var(--warning)] p-1 rounded-lg  items-center flex flex-col">
                        <div>Request In</div>
                        <div className="w-fit flex">
                          <CustomButton
                            callback={() => {
                              handleDeclineFriend();
                            }}
                            buttonstyle={false}
                          >
                            <CloseIcon strokeColor="var(--error)"></CloseIcon>
                          </CustomButton>
                          <CustomButton
                            callback={() => {
                              handleAcceptFriend();
                            }}
                            buttonstyle={false}
                          >
                            <AddIcon strokeColor="var(--success)"></AddIcon>
                          </CustomButton>
                        </div>
                      </div>
                    ) : isRequestedOut ? (
                      <div className="text-gray-50 link-regular bg-[var(--warning)] p-1 rounded-lg items-center flex">
                        <div>Request Out</div>
                        <div className="w-fit">
                          <CustomButton
                            callback={() => {
                              handleRequestDelete();
                            }}
                            buttonstyle={false}
                          >
                            <CloseIcon strokeColor="var(--error)"></CloseIcon>
                          </CustomButton>
                        </div>
                      </div>
                    ) : (
                      <CustomButton
                        callback={() => {
                          handleAddFriend();
                        }}
                      >
                        <div className="flex gap-1 items-center">
                          <AddIcon strokeColor="#f9fafb"></AddIcon>
                          <div>Add a friend</div>
                        </div>
                      </CustomButton>
                    )
                  ) : (
                    ""
                  )}
                </div>
                <div></div>
              </div>
              <div className="flex flex-col gap-10 items-center">
                <div className="hidden max-sm:flex">
                  <CustomButton
                    buttonstyle={false}
                    callback={() => {
                      setUserActivityList(!userActivityList);
                    }}
                  >
                    <div className="flex flex-row items-center">
                      <div>Show user activity</div>
                      <div
                        className={` h-fit w-fit ${
                          userActivityList ? "-rotate-90" : "rotate-90"
                        }`}
                      >
                        <ArrowRightIcon strokeColor="var(--primary)"></ArrowRightIcon>
                      </div>
                    </div>
                  </CustomButton>
                </div>
                <div
                  className={`flex flex-row flex-wrap justify-items-center justify-center gap-3  max-sm:${
                    userActivityList ? "" : "hidden"
                  }`}
                >
                  {pageUserData ? (
                    <>
                      <LinkTo href={`${pageUserData.id}/animeWatched`}>
                        <InfoCard info={pageUserData.animeWatched.length}>
                          Anime watched
                        </InfoCard>
                      </LinkTo>
                      {/* <InfoCard info={26}>Manga's</InfoCard> */}
                      <LinkTo href={`${pageUserData.id}/reviews`}>
                        <InfoCard info={pageUserData.reviews.length}>
                          Reviews
                        </InfoCard>
                      </LinkTo>
                      <LinkTo href={`${pageUserData.id}/suggestions`}>
                        <InfoCard info={pageUserData.suggestions_to_me?.length}>
                          Suggestions
                        </InfoCard>
                      </LinkTo>
                      <LinkTo href={`${pageUserData.id}/wantToWatch`}>
                        <InfoCard info={pageUserData.wantToWatch.length}>
                          Want to watch
                        </InfoCard>
                      </LinkTo>
                      <LinkTo href={`${pageUserData.id}/friends`}>
                        <InfoCard info={pageUserData.friends.length}>
                          {pageUserData.friends.length > 1 ? (
                            <div>Friends</div>
                          ) : (
                            <div>Friend</div>
                          )}
                        </InfoCard>
                      </LinkTo>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            {pageUserData ? (
              pageUserData.favorite_anime ? (
                <div className="flex flex-row items-center gap-4 bg-slate-700 rounded-xl p-4 bg-opacity-40 ">
                  <div className="mx-auto text-center">
                    <div className="heading-three text-gray-50">
                      Favorite Anime
                    </div>
                    <AnimeCard id={pageUserData.favorite_anime.id}></AnimeCard>
                  </div>
                </div>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default UserPage;
