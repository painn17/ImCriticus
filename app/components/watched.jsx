import { useUserAnimeActivity } from "../services/strapi/userAnimeactions";
import { useUserActivity } from "../services/strapi/useractions";
import { useAuth } from "../context/AuthContext";
import { AddIcon, VideoTickIcon, CloseIcon } from "./ui/icons/icons";
import CustomButton from "./ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
function WatchedButton({ iswatched, id, isManagable }) {
  const { userData, setUserData } = useAuth();
  const router = useRouter();
  const { updateUserData } = useUserActivity();
  const { addToWatched, deleteWatched, deleteWantWatch, watchedSuggestion } =
    useUserAnimeActivity();
  const [hasInWantToWatchList, sethasInWantToWatchList] = useState();
  const [hasSuggestion, setHasSuggestion] = useState();
  const [isSuggestionAccepted, setIsSuggestionsAccepted] = useState();
  const [suggestionId, setSuggestionId] = useState();
  useEffect(() => {
    const WantToWatchList = userData.wantToWatch.some(
      (anime) => anime.id === id
    );
    sethasInWantToWatchList(WantToWatchList);
    const Suggestion = userData.suggestions_to_me.some((item) => {
      setSuggestionId(item.id);
      return item.suggested_anime.id === id;
    });
    setHasSuggestion(Suggestion);
    const SuggestionAccepted = userData.suggestions_to_me.some((item) => {
      return item.isAccepted === true;
    });
    setIsSuggestionsAccepted(SuggestionAccepted);
  }, [userData]);

  const handleAddToWatched = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    console.log(hasInWantToWatchList);
    if (hasInWantToWatchList) {
      const data = await deleteWantWatch(id);
      console.log(data, "deleting anime from want to watch list");
    }
    if (hasSuggestion && isSuggestionAccepted) {
      const watched = await watchedSuggestion(suggestionId);
      console.log(watched);
    }
    addToWatched(id);

    const user = await updateUserData();
    setUserData(user);
  };

  const handleDeleteWatched = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    deleteWatched(id);
    const user = await updateUserData();
    setUserData(user);
  };
  return (
    <CustomButton
      buttonstyle={false}
      isClickable={iswatched}
      callback={(event) => {
        handleDeleteWatched(event);
      }}
    >
      <div className=" gap-2 heading-five flex ">
        {isManagable ? (
          ""
        ) : (
          <>
            {iswatched ? (
              <div className="relative group">
                <div className="warning-text flex items-center group gap-1 hidden group-hover:flex">
                  <CloseIcon strokeColor="var(--warning)" />
                  <div>Delete </div>
                  <div className="hidden group-hover:block ">from watched</div>
                </div>
                <div className="flex gap-1 items-center group-hover:hidden">
                  <VideoTickIcon strokeColor="var(--success)" />
                  <div>Watched</div>
                </div>
              </div>
            ) : (
              <div
                className="flex gap-1 items-center"
                onClick={(event) => {
                  handleAddToWatched(event);
                }}
              >
                <AddIcon strokeColor="var(--primary)"></AddIcon>
                <div>Add to Watched</div>
              </div>
            )}
          </>
        )}
      </div>
    </CustomButton>
  );
}

export default WatchedButton;
