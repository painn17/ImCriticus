"use client";
import InfoCard from "../../components/ui/infoCard";
import { useAuth } from "../../context/AuthContext";
import LinkTo from "../../components/ui/link";
import { ArrowRightIcon } from "../../components/ui/icons/icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserActivity } from "../../services/strapi/useractions";
import UserImage from "@/app/components/ui/userImage";
import AvatarUpload from "@/app/components/avatarUpload";
import UserNameChange from "@/app/components/usernameChange";
import FriendsList from "@/app/components/friendsList";
import BackButton from "@/app/components/ui/back";
import CustomButton from "@/app/components/ui/button";
import { useModal } from "@/app/context/ModalContext";
import Loader from "@/app/components/ui/loader";
import AnimeCard from "@/app/components/animeCard";
import { useUserAnimeActivity } from "@/app/services/strapi/userAnimeactions";

function Dashbord() {
  const { isLogged, setIsLogged, userData, setUserData } = useAuth();
  const [preview, setPreview] = useState(null);
  const [newName, setNewName] = useState("");
  const { updateUserData } = useUserActivity();
  const [userActivityList, setUserActivityList] = useState(false);
  const [friendsList, setFriendsList] = useState(false);
  const [edit, setEdit] = useState(false);
  const { showModal } = useModal();
  // const list = [
  //   { username: "Lorem", id: 10 },
  //   { username: "Ipsum", id: 9 },
  //   { username: "Dolor", id: 11 },
  //   { username: "Dolor", id: 11 },
  //   { username: "Dolor", id: 11 },
  //   { username: "Dolor", id: 11 },
  //   { username: "Dolor", id: 11 },
  //   { username: "Dolor", id: 11 },
  // ];

  const { deleteFavoriteAnime } = useUserAnimeActivity();

  console.log(userData);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("JWTtoken");
      if (token) {
        try {
          const response = await updateUserData();
          setIsLogged(true);
          setUserData(response);
          console.log(userData, isLogged);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    };
    fetchData();
  }, []);

  const handleDeleteFavoriteAnime = async (id) => {
    const data = await deleteFavoriteAnime(id);
    console.log(data);
    const update = await updateUserData();
    setUserData(update);
  };

  return (
    <div>
      <BackButton
      // url={`/user/${userData?.id}`}
      ></BackButton>
      {userData ? (
        isLogged ? (
          <div className="flex flex-col gap-20">
            <div className="flex flex-col gap-10">
              <div className="w-fit"></div>
              <div className="heading-one text-gray-50">
                <div>Welcome </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-8 grid-rows-2 max-md:grid-rows-1 w-full gap-4">
                  <div className="grid grid-cols-10 max-sm:grid-cols-1  col-span-full gap-2 mx-auto items-stretch">
                    <div className="col-span-2 flex flex-col items-center">
                      {preview ? (
                        <div className="flex flex-col items-center">
                          <div className="text-[var(--warning)] heading-five mx-auto ">
                            Preview:
                          </div>
                          <img
                            className="h-52 w-52 rounded-full"
                            src={preview}
                            alt="Preview"
                          />
                        </div>
                      ) : (
                        <UserImage url={userData.user_picture?.url}></UserImage>
                      )}
                      <div className="text-gray-50 heading-four mx-auto ">
                        {newName ? newName : userData.username}
                      </div>
                      <div className="hidden max-sm:flex ">
                        <CustomButton
                          callback={() => {
                            showModal(
                              <div className="col-span-4 max-sm:col-span-full col-start-5">
                                <div className="flex flex-col gap-4 w-full">
                                  <div className="self-center">
                                    {preview ? (
                                      <div className="flex flex-col items-center">
                                        <div className="text-[var(--warning)] heading-five mx-auto ">
                                          Preview:
                                        </div>
                                        <img
                                          className="h-52 w-52 rounded-full"
                                          src={preview}
                                          alt="Preview"
                                        />
                                      </div>
                                    ) : (
                                      <UserImage
                                        url={userData.user_picture?.url}
                                      ></UserImage>
                                    )}
                                  </div>
                                  <div className="text-gray-50 heading-four mx-auto ">
                                    {newName ? newName : userData.username}
                                  </div>
                                  <UserNameChange
                                    username={newName}
                                    setUserName={setNewName}
                                  ></UserNameChange>
                                  <AvatarUpload
                                    preview={preview}
                                    setPreview={setPreview}
                                  ></AvatarUpload>
                                </div>
                              </div>
                            );
                          }}
                          className="text-gray-50 heading-four mx-auto  "
                        >
                          Edit profile
                        </CustomButton>
                      </div>
                    </div>
                    <div
                      className={`w-full col-start-4 col-span-8 flex flex-col justify-evenly max-sm:hidden
                      `}
                    >
                      <UserNameChange
                        username={newName}
                        setUserName={setNewName}
                      ></UserNameChange>
                      <AvatarUpload
                        preview={preview}
                        setPreview={setPreview}
                      ></AvatarUpload>
                    </div>
                  </div>

                  <div className="w-full grid grid-cols-3 gap-4 col-span-8 row-start-2 ">
                    <div className="hidden max-sm:flex col-span-3 mx-auto">
                      <CustomButton
                        buttonstyle={false}
                        callback={() => {
                          setFriendsList(!friendsList);
                        }}
                      >
                        <div className="flex flex-row items-center">
                          <div>Show friends list</div>
                          <div
                            className={` h-fit w-fit ${
                              friendsList ? "-rotate-90" : "rotate-90"
                            }`}
                          >
                            <ArrowRightIcon strokeColor="var(--primary)"></ArrowRightIcon>
                          </div>
                        </div>
                      </CustomButton>
                    </div>
                    <div
                      className={`${
                        friendsList ? "" : "max-sm:hidden"
                      } w-full grid grid-cols-3 items-baseline gap-4 col-span-8 max-md:flex max-md:flex-col max-md:items-center`}
                    >
                      <FriendsList
                        type={"friendsIn"}
                        list={userData.friends_request_in}
                        // list={list}
                      >
                        Friends in:
                      </FriendsList>
                      <FriendsList
                        type={"friendsOut"}
                        list={userData.friends_request_out}
                      >
                        Friends out:
                      </FriendsList>
                      <FriendsList type={"friends"} list={userData.friends}>
                        Friends list:
                      </FriendsList>
                    </div>
                  </div>
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
                    className={`flex flex-row flex-wrap justify-items-center justify-center gap-3 ${
                      userActivityList ? "" : "max-sm:hidden"
                    }`}
                  >
                    {userData ? (
                      <>
                        <LinkTo href={`${userData.id}/animeWatched`}>
                          <InfoCard info={userData.animeWatched?.length}>
                            Anime watched
                          </InfoCard>
                        </LinkTo>
                        {/* <InfoCard info={26}>Manga's</InfoCard> */}
                        <LinkTo href={`${userData.id}/reviews`}>
                          <InfoCard info={userData.reviews?.length}>
                            Reviews
                          </InfoCard>
                        </LinkTo>
                        <LinkTo href={`${userData.id}/suggestions`}>
                          <InfoCard info={userData.suggestions_to_me?.length}>
                            Suggestions
                          </InfoCard>
                        </LinkTo>
                        <LinkTo href={`${userData.id}/wantToWatch`}>
                          <InfoCard info={userData.wantToWatch.length}>
                            Want to watch
                          </InfoCard>
                        </LinkTo>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {userData ? (
                  <div className="flex flex-col">
                    {userData.favorite_anime ? (
                      <div className="flex flex-row items-center gap-4 bg-slate-700 rounded-xl p-4 bg-opacity-40 ">
                        <div className="mx-auto text-center flex gap-2 flex-col">
                          <div className="heading-three text-gray-50">
                            Favorite Anime
                          </div>
                          <AnimeCard
                            id={userData.favorite_anime.id}
                          ></AnimeCard>
                          <CustomButton
                            callback={() => {
                              handleDeleteFavoriteAnime(
                                userData.favorite_anime.id
                              );
                            }}
                          >
                            Remove from favorite
                          </CustomButton>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="heading-one text-gray-50 text-center flex flex-col items-center gap-4">
            <h1>You not logged in</h1>
            <LinkTo href={"/auth"}>
              <div className="heading-three primary-text flex flex-row gap-2 items-center">
                <h3>To login page</h3>{" "}
                <ArrowRightIcon strokeColor="var(--primary)"></ArrowRightIcon>
              </div>
            </LinkTo>
          </div>
        )
      ) : (
        <Loader loading={true}></Loader>
      )}
    </div>
  );
}

export default Dashbord;
