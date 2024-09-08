import { useState } from "react";
import { useModal } from "@/app/context/ModalContext";
import CustomButton from "./button";

function UserImage({ url, openModal = true }) {
  const { showModal } = useModal();

  const handleButtonClick = () => {
    if (openModal) {
      showModal(
        <img
          src={`http://localhost:1337${url}`}
          alt=""
          srcset=""
          className="w-full"
        />
      );
    }
  };

  return (
    <>
      {url ? (
        <div className="mx-auto">
          <CustomButton buttonstyle={false} callback={handleButtonClick}>
            <img
              src={`http://localhost:1337${url}`}
              alt=""
              srcset=""
              className="rounded-full w-52"
            />
          </CustomButton>
        </div>
      ) : (
        <img
          src={`http://localhost:1337/uploads/Image_Placeholder_2444e47cd2.png`}
          alt=""
          srcset=""
          className="rounded-full w-52"
        />
      )}
    </>
  );
}

export default UserImage;
