import UserImage from "./ui/userImage";
import LinkTo from "./ui/link";
import CustomButton from "./ui/button";
import { AddIcon, CloseIcon, LinkIcon, VideoPlayIcon } from "./ui/icons/icons";
import { useUserActivity } from "../services/strapi/useractions";
import { useAuth } from "../context/AuthContext";
import { useSnackbar } from "../context/SnackBarContext";
import { useState } from "react";
import { useModal } from "../context/ModalContext";
import { useUserAnimeActivity } from "../services/strapi/userAnimeactions";
import SuggestionForm from "./suggestionForm";
import Modal from "./ui/modal";
function FriendCard({ friend, type }) {
  const { updateUserData, deleteFriend } = useUserActivity();
  const { sendSuggestion } = useUserAnimeActivity();
  const [suggestVisible, setSuggestVisible] = useState(false);
  const { showModal, hideModal } = useModal();
  const { showSnackbar } = useSnackbar();
  const { userData, setUserData } = useAuth();
  const handleDeleteFriend = async () => {
    const data = await deleteFriend(friend, userData);
    const update = await updateUserData();
    setUserData(update);
    showSnackbar("Friend deleted", "success");
    console.log(" friend accepted", data);
  };
  return (
    <div className="flex flex-col gap-2 col-span-3 items-center rounded-lg bg-gray-700 p-4 bg-opacity-50 bg-blur ">
      <UserImage url={friend.user_picture?.url}></UserImage>
      <LinkTo href={`/user/${friend.id}`}>
        <LinkIcon strokeColor="var(--primary)"></LinkIcon>
        <div className="primary-text heading-four">{friend.username}</div>
      </LinkTo>
      <div>
        {type ? (
          <div className="mx-auto flex flex-col items-center">
            <CustomButton
              buttonstyle={false}
              callback={() => {
                handleDeleteFriend();
              }}
            >
              <div className="flex mx-auto w-fit">
                <CloseIcon strokeColor="var(--warning)"></CloseIcon>
                <div className="warning-text ">Delete</div>
              </div>
            </CustomButton>
            <CustomButton
              buttonstyle={false}
              callback={() => {
                showModal(
                  <SuggestionForm setVisible={hideModal} friendData={friend}>
                    {friend.username}
                  </SuggestionForm>
                );
              }}
            >
              <div className="text-gray-50 p-1 flex gap-1 items-center">
                <VideoPlayIcon></VideoPlayIcon>
                <div className="">Suggest to watch</div>
              </div>
            </CustomButton>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default FriendCard;
