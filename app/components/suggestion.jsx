import AnimeCard from "./animeCard";
import LinkTo from "./ui/link";
import { CloseIcon, LinkIcon, TickIcon } from "./ui/icons/icons";
import { useAuth } from "../context/AuthContext";
import { useUserAnimeActivity } from "../services/strapi/userAnimeactions";
import { useUserActivity } from "../services/strapi/useractions";
import CustomButton from "./ui/button";
function Suggestion({ item, isUserPage, toMe = false }) {
  const { userData, setUserData } = useAuth();
  const {
    deleteSuggestion,
    acceptSuggestion,
    declineSuggestion,
    addToWantWatch,
    deleteWantWatch,
    addToWatched,
    deleteWatched,
    watchedSuggestion,
  } = useUserAnimeActivity();
  const { updateUserData } = useUserActivity();
  const handleDeleteSuggestion = async () => {
    const data = await deleteSuggestion(item.id);
    const update = await updateUserData();
    setUserData(update);
    console.log(data);
  };

  const handleAcceptSuggestion = async () => {
    const data = await acceptSuggestion(item.id);
    const watch = await addToWantWatch(item.suggested_anime.id);
    const update = await updateUserData();
    setUserData(update);
    console.log(data, watch);
  };
  const handleDeclineSuggestion = async () => {
    const data = await declineSuggestion(item.id);
    const update = await updateUserData();
    const isAnimeInWantToWatch = userData.wantToWatch.some(
      (anime) => anime.id === item.suggested_anime.id
    );

    if (isAnimeInWantToWatch) {
      deleteWantWatch(item.suggested_anime.id);
    }
    setUserData(update);
    console.log(data);
  };

  const handleWatchedThis = async () => {
    const data = await addToWatched(item.suggested_anime.id);
    const watched = await watchedSuggestion(item.id);
    const update = await updateUserData();
    setUserData(update);
  };
  return (
    <div
      className={`flex flex-col gap-2 col-span-3 text-center items-center rounded-lg bg-gray-700 p-4 bg-opacity-50 bg-blur ${
        item.isAccepted == null ? " " : item.isAccepted ? " " : "opacity-50"
      } hover:opacity-100`}
    >
      <div>
        {isUserPage ? (
          toMe ? (
            item.isAccepted == null ? (
              <div className="flex flex-row gap-2 items-center">
                <CustomButton
                  callback={() => {
                    handleAcceptSuggestion();
                  }}
                  buttonstyle={false}
                >
                  <div className="flex flex-row items-center text-[var(--success)]">
                    <TickIcon strokeColor="var(--success)"></TickIcon>
                    <div className="heading-four">Accept</div>
                  </div>
                </CustomButton>
                <CustomButton
                  callback={() => {
                    handleDeclineSuggestion();
                  }}
                  buttonstyle={false}
                >
                  <div className="flex flex-row items-center text-[var(--error)]">
                    <CloseIcon strokeColor="var(--error)"></CloseIcon>
                    <div className="heading-four">Decline</div>
                  </div>
                </CustomButton>
              </div>
            ) : item.isWatched ? (
              <div className="text-[var(--primary)] heading-three">
                I watched this
              </div>
            ) : item.isAccepted ? (
              <div className="flex flex-col gap-2 items-center">
                <div className="flex flex-row gap-2 items-center">
                  <CustomButton
                    buttonstyle={false}
                    className="text-[var(--success)]"
                  >
                    <div className="text-[var(--success)] heading-three">
                      Accepted
                    </div>
                  </CustomButton>
                  <CustomButton
                    callback={() => {
                      handleDeclineSuggestion();
                    }}
                    buttonstyle={false}
                  >
                    <div className="flex flex-row items-center text-[var(--error)]">
                      <CloseIcon strokeColor="var(--error)"></CloseIcon>
                      <div className="heading-five">Decline</div>
                    </div>
                  </CustomButton>
                </div>
                <CustomButton
                  buttonstyle={false}
                  callback={() => {
                    handleWatchedThis();
                  }}
                >
                  <div className="text-[var(--warning)]">I watched this</div>
                </CustomButton>
              </div>
            ) : (
              <div className="flex flex-row gap-2 items-center">
                <CustomButton
                  callback={() => {
                    handleAcceptSuggestion();
                  }}
                  buttonstyle={false}
                >
                  <div className="flex flex-row items-center text-[var(--success)]">
                    <TickIcon strokeColor="var(--success)"></TickIcon>
                    <div className="heading-five">Accept</div>
                  </div>
                </CustomButton>
                <CustomButton buttonstyle={false}>
                  <div className="text-[var(--error)] heading-three">
                    Declined
                  </div>
                </CustomButton>
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center ">
              <div className="w-fit">
                <CustomButton
                  callback={() => {
                    handleDeleteSuggestion();
                  }}
                  buttonstyle={false}
                >
                  <div className="flex flex-row items-center text-[var(--error)]">
                    <CloseIcon strokeColor="var(--error)"></CloseIcon>
                    <div className="heading-four">Delete</div>
                  </div>
                </CustomButton>
              </div>
              <div className="text-gray-50">
                <div className="heading-five ">Suggestion status:</div>
                <div>
                  {item.isAccepted == null ? (
                    <div>Sended</div>
                  ) : item.isAccepted ? (
                    <div className="text-[var(--success)]">Accepted</div>
                  ) : (
                    <div className="text-[var(--warning)]">Declined</div>
                  )}
                </div>
              </div>
            </div>
          )
        ) : (
          ""
        )}
      </div>
      <AnimeCard
        cardWithButton={false}
        id={item.suggested_anime.id}
      ></AnimeCard>
      <div>
        {toMe ? (
          <div className="flex flex-col">
            <div className="text-gray-50 heading-six">Was proposed by</div>
            <LinkTo href={`/user/${item.proposed_by.id}`}>
              <LinkIcon strokeColor="var(--primary)"></LinkIcon>
              <div className="primary-text heading-four">
                {item.proposed_by.username}
              </div>
            </LinkTo>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="text-gray-50 heading-six">Was proposed to</div>
            <LinkTo href={`/user/${item.proposed_to.id}`}>
              <LinkIcon strokeColor="var(--primary)"></LinkIcon>
              <div className="primary-text heading-four">
                {item.proposed_to.username}
              </div>
            </LinkTo>
          </div>
        )}
      </div>
      <>
        {isUserPage || item.proposed_by.id == userData?.id ? (
          item.suggest_message ? (
            <>
              <div className="text-gray-50 heading-six">Message:</div>
              <div className="warning-text heading-four">
                {item.suggest_message}
              </div>
            </>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </>
    </div>
  );
}

export default Suggestion;
