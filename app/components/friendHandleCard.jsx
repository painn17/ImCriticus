import CustomButton from "./ui/button";
import { AddIcon, CloseIcon, LinkIcon } from "./ui/icons/icons";
import LinkTo from "./ui/link";
import { useUserActivity } from "../services/strapi/useractions";
import { useAuth } from "../context/AuthContext";
import { useSnackbar } from "../context/SnackBarContext";
import { useState } from "react";
import CustomAlert from "./CustomAlert";
function FriendHandleCard({ type, item }) {
  const {
    declineFriendsRequest,
    updateUserData,
    acceptFriendsRequest,
    deleteFriend,
  } = useUserActivity();
  const { showSnackbar } = useSnackbar();
  const { userData, setUserData } = useAuth();
  const handleDeleteFriend = async () => {
    const data = await deleteFriend(item, userData);
    const update = await updateUserData();
    setUserData(update);
    showSnackbar("Friend deleted", "success");
    console.log(" friend accepted", data);
  };
  const handleAcceptFriend = async () => {
    const data = await acceptFriendsRequest(item, userData);
    const update = await updateUserData();
    setUserData(update);
    showSnackbar("Friend accepted", "success");
    console.log(" friend accepted", data);
  };
  const handleDeclineFriend = async () => {
    const data = await declineFriendsRequest(item, userData);
    console.log("friend decline", data);
    const update = await updateUserData();
    showSnackbar("Friend request declined", "success");
    setUserData(update);
  };
  const handleRequestDelete = async () => {
    const data = await declineFriendsRequest(userData, item);
    console.log("request to user deleted", data);
    const update = await updateUserData();
    showSnackbar("Your request was deleted", "success");
    setUserData(update);
  };
  return (
    <div className="flex gap-4 items-center justify-between bg-gray-900 bg-opacity-50 p-2 rounded-lg">
      <div className="w-fit">
        <LinkTo href={`/user/${item.id}`}>
          <div className="primary-text heading-five capitalize flex flex-row gap-1  ">
            <LinkIcon strokeColor="var(--primary)"></LinkIcon>
            <div>{item.username}</div>
          </div>
        </LinkTo>
      </div>
      <div className="w-min pr-2">
        {type === "friends" ? (
          <CustomButton
            buttonstyle={false}
            callback={() => {
              handleDeleteFriend();
            }}
          >
            <CloseIcon strokeColor="var(--warning)"></CloseIcon>
          </CustomButton>
        ) : type === "friendsIn" ? (
          <div className="flex">
            <CustomButton
              buttonstyle={false}
              callback={() => {
                handleDeclineFriend();
              }}
            >
              <CloseIcon strokeColor="var(--warning)"></CloseIcon>
            </CustomButton>
            <CustomButton
              buttonstyle={false}
              callback={() => {
                handleAcceptFriend();
              }}
            >
              <AddIcon strokeColor="var(--success)"></AddIcon>
            </CustomButton>
          </div>
        ) : type === "friendsOut" ? (
          <CustomButton
            buttonstyle={false}
            callback={() => {
              handleRequestDelete();
            }}
          >
            <CloseIcon strokeColor="var(--warning)"></CloseIcon>
          </CustomButton>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default FriendHandleCard;
