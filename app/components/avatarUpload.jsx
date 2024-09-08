import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import CustomButton from "./ui/button";
import CustomInput from "./ui/input";
import { useUserActivity } from "../services/strapi/useractions";

function AvatarUpload({ preview, setPreview }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const { updateUserData } = useUserActivity();

  const { userData, setUserData } = useAuth();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("files", selectedFile);
    formData.append("ref", "plugin::users-permissions.user"); // Указываем на какую модель ссылаемся
    formData.append("refId", userData.id); // Указываем ID пользователя
    formData.append("field", "user_picture"); // Указываем поле для аватарки
    const token = localStorage.getItem("JWTtoken");
    try {
      const response = await axios.post(
        "http://localhost:1337/api/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        const data = await updateUserData();
        setUserData(data);
      }
      console.log("Upload successful:", response);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="flex flex-col py-4 gap-2 ">
      <div className="grid grid-cols-5 grid-rows-3 items-center gap-2 ">
        <div className="col-span-5 row-span-2 flex flex-col justify-between h-full gap-2">
          <div className="">
            <CustomInput type="file" handleValueChange={handleFileChange} />
          </div>
          <CustomButton
            height={"full"}
            callback={() => {
              handleUpload();
            }}
          >
            Upload Avatar
          </CustomButton>
        </div>
        {/* <div className="bg-gray-600 p-1 rounded-lg bg-opacity-40 col-span-1 row-span-2 w-fit ">
          <img
            className="w-32 h-32  rounded-full"
            src={
              preview ||
              `http://localhost:1337/uploads/Image_Placeholder_2444e47cd2.png`
            }
            alt="Preview"
          />
        </div> */}
      </div>
    </div>
  );
}

export default AvatarUpload;
