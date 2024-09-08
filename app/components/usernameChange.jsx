import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import CustomInput from "./ui/input";
import CustomButton from "./ui/button";
import { useUserActivity } from "../services/strapi/useractions";
function UserNameChange({ username, setUserName }) {
  // const [username, setUserName] = useState();
  const { userData, setUserData } = useAuth();
  const { changeUserName } = useUserActivity();
  const { updateUserData } = useUserActivity();
  const handleUserNameChange = (event) => {
    console.log(event.target.value);
    setUserName(event.target.value);
  };
  const hangleChangeName = async () => {
    const response = await changeUserName(username, userData.id);
    console.log(response);
    // if (response.status === 200) {
    const data = await updateUserData();
    setUserData(data);
    // }
  };
  return (
    <div className="flex flex-col gap-2">
      <CustomInput
        value={username}
        handleValueChange={handleUserNameChange}
        placeholder={"Change name"}
      ></CustomInput>
      <CustomButton
        callback={() => {
          hangleChangeName();
        }}
      >
        Change Username
      </CustomButton>
    </div>
  );
}

export default UserNameChange;
