import { useState } from "react";
import CustomInput from "./ui/input";
import Button from "./ui/button";
import { VideoPlayIcon, LinkIcon, CloseIcon } from "./ui/icons/icons";
import Select from "react-select";
import { getAnime } from "../services/animeApi/animeApi";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useUserAnimeActivity } from "../services/strapi/userAnimeactions";
import { useSnackbar } from "../context/SnackBarContext";

import { Alert } from "@mui/material";
import CustomButton from "./ui/button";
import CustomSelect from "./ui/customSelect";
function SuggestionForm({ children, visible, setVisible, friendData }) {
  const [anime, setAnime] = useState();
  const [suggestedAnime, setSuggestedAnime] = useState();
  const { showSnackbar } = useSnackbar();
  const [message, setMessage] = useState("");
  const { userData } = useAuth();
  const { sendSuggestion } = useUserAnimeActivity();
  const [isAllreadyWatched, setIsAllreadyWatched] = useState(false);
  const [isAllreadySuggested, setIsAllreadySuggested] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleAnimeChange = (event) => {
    console.log(event);
    setSuggestedAnime(event.value);

    console.log(suggestedAnime, isAllreadyWatched);
  };
  const handleMessageChange = (event) => {
    const data = event.target.value;
    console.log(data);
    setMessage(data);
  };

  const getAllAnime = async () => {
    const data = await getAnime();
    console.log(data.data);

    setAnime(
      data.data.map((item) => {
        return { value: item.id, label: item.attributes.name };
      })
    );
  };
  useEffect(() => {
    getAllAnime();
  }, [visible]);
  useEffect(() => {
    setIsAllreadyWatched(
      friendData.animeWatched.some((item) => {
        return item.id === suggestedAnime;
      })
    );
    setIsAllreadySuggested(
      friendData.suggestions_to_me.some((item) => {
        return item.suggested_anime?.id === suggestedAnime;
      })
    );
    console.log(isAllreadySuggested);
  }, [suggestedAnime]);

  const handleSendSuggestion = async () => {
    console.log(friendData);
    if (isAllreadyWatched) {
      showSnackbar(
        "User allready watched this anime, suggest another anime",
        "error"
      );
    }
    if (isAllreadySuggested) {
      showSnackbar(
        "User allready have suggestion to watch this anime, suggest another anime",
        "error"
      );
    } else {
      const suggestion = {
        suggested_anime: suggestedAnime,
        suggest_message: message,
        proposed_by: userData.id,
        proposed_to: friendData.id,
      };
      const data = await sendSuggestion(suggestion);
      console.log(data);
    }
    showSnackbar("Suggestion sended", "success");
    setVisible();
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#111827", // bg-slate-700
      color: "#F9FAFB", // text-gray-50
      borderColor: "#4b5563", // border-gray-600
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#F9FAFB", // text-gray-50
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#111827", // bg-slate-700
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#1F2937" : "#111827",
      color: "#F9FAFB", // text-gray-50
    }),
  };

  return (
    <div
    // className={
    //   "fixed top-0 right-0 left-0 z-10 bottom-0 bg-black bg-opacity-50 flex justify-center items-center "
    // }
    >
      <div className="flex flex-col gap-10 p-20 rounded-xl w-min text-center relative">
        {/* <div
          className="absolute right-6 top-6 rounded bg-gray-950 p-2 cursor-pointer"
        >
          <CloseIcon />
        </div> */}
        <div className="heading-four text-gray-50">
          Suggest <div className="primary-text">{children}</div> to watch
          something
        </div>
        <div className="flex flex-col w-full gap-4 items-center text-black justify-between">
          <div className="w-full  rounded-xl h-fit">
            <CustomSelect
              required
              options={anime}
              handler={(event) => {
                handleAnimeChange(event);
              }}
            />
          </div>
          <CustomInput
            symbol={<LinkIcon />}
            placeholder="Message"
            value={message}
            name="Message"
            inputname="Message"
            required
            handleValueChange={handleMessageChange}
          />
          <CustomButton
            buttonstyle={true}
            className="w-full"
            callback={() => handleSendSuggestion()}
          >
            Suggest
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default SuggestionForm;
