import { useUserAnimeActivity } from "../services/strapi/userAnimeactions";
import { useUserActivity } from "../services/strapi/useractions";
import { useAuth } from "../context/AuthContext";
import { AddIcon, VideoTickIcon, CloseIcon } from "./ui/icons/icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CustomButton from "./ui/button";
function WantToWatchButton({
  iswatched,
  id,
  isManagable,
  isInWantToWatchList,
}) {
  const { userData, setUserData } = useAuth();
  const router = useRouter();
  const { updateUserData } = useUserActivity();
  const { addToWantWatch, deleteWantWatch } = useUserAnimeActivity();
  const handleWantToWatch = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    addToWantWatch(id);
    const response = await updateUserData();
    setUserData(response);
  };
  const handleDeleteWantToWatch = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    deleteWantWatch(id);
    const response = await updateUserData();
    setUserData(response);
  };
  return (
    <>
      {!iswatched ? (
        <CustomButton
          buttonstyle={false}
          callback={
            isInWantToWatchList
              ? (event) => {
                  handleDeleteWantToWatch(event);
                } //функция удаления просмотренного
              : (event) => {
                  handleWantToWatch(event);
                }
          }
        >
          <div className=" gap-2 heading-five flex transition duration-200 ease-linear">
            {isInWantToWatchList ? (
              <div className="relative group">
                <div className="flex gap-1 items-center text-[var(--success)] group-hover:hidden">
                  <VideoTickIcon strokeColor="var(--success)" />
                  <div>Want to see</div>
                </div>

                <div className="warning-text flex items-center gap-1  hidden group-hover:flex">
                  <CloseIcon strokeColor="var(--warning)" />
                  <div>Delete</div>
                  <div>from want to watch</div>
                </div>
              </div>
            ) : (
              <div className="flex gap-1 items-center">
                <AddIcon strokeColor="var(--primary)"></AddIcon>
                <div>Add to "Want to watch" list</div>
              </div>
            )}
          </div>
        </CustomButton>
      ) : (
        ""
      )}
    </>
  );
}

export default WantToWatchButton;
