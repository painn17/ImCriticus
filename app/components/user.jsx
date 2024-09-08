import React from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Button from "./ui/button";
import UserImage from "./ui/userImage";
import { ArrowRightIcon } from "./ui/icons/icons";
import LinkTo from "./ui/link";
import Loader from "./ui/loader";
function User() {
  const { setIsLogged, isLogged, setUserData, userData } = useAuth();
  const router = useRouter();

  return (
    <LinkTo href={`/user/${userData?.id}`}>
      <div className="p-2 m-2 rounded">
        {userData ? (
          isLogged ? (
            <div className="flex items-center gap-2 max-lg:flex-col">
              <div className="w-14 h-14 items-center flex">
                <UserImage
                  openModal={false}
                  url={userData?.user_picture?.url}
                ></UserImage>
              </div>
              <div>
                <div>
                  <div>
                    <h1 className="text-gray-50">{userData?.username}</h1>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )
        ) : (
          <Loader loading={true}></Loader>
        )}
      </div>
    </LinkTo>
  );
}

export default User;
