import {
  StarIcon,
  LikeIcon,
  AddIcon,
  VideoTickIcon,
  CloseIcon,
} from "./ui/icons/icons";
import Rating from "./ui/rating";
import LinkTo from "./ui/link";
import { useAuth } from "../context/AuthContext";
import { getSingleAnime } from "../services/animeApi/animeApi";
import CustomButton from "./ui/button";
import WatchedButton from "./watched";
import { useState, useEffect } from "react";
import WantToWatchButton from "./wantToWatch";
function AnimeCard({
  // data,
  cardWithButton,
  buttonCallback,
  id,
  icon = <AddIcon strokeColor="var(--primary)" />,
  placeholder,
  buttontype = false,
  isManagable = false,
}) {
  const { userData, setUserData, isLogged } = useAuth();
  const [animeData, setAnimeData] = useState();
  const [iswatched, setIsWatched] = useState(false);
  useEffect(() => {
    console.log(userData);
    const fetchAnime = async () => {
      try {
        const response = await getSingleAnime(id);
        setAnimeData(response.data.attributes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAnime();
  }, [id, userData]);
  useEffect(() => {
    const hasWatched = userData?.animeWatched.some((anime) => anime.id === id);
    console.log(hasWatched);

    if (hasWatched) {
      setIsWatched(true);
    } else if (!hasWatched) {
      setIsWatched(false);
    }
  }, [animeData, userData]);

  return (
    <div className="col-span-3 ">
      {placeholder ? (
        <div className="col-span-3 rounded-xl bg-gray-900  w-[320px] h-[550px]">
          <div
            className={`flex flex-col justify-between p-4 rounded-xl bg-blur gap-1 h-full`}
          >
            <div className="flex h-full ">
              <div className="w-14 h-8 absolute flex gap-2 rounded-lg ml-2 mt-3 px-2 py-1 warning-text backdrop-blur-xl bg-black bg-opacity-20"></div>
              <div className="w-full h-[400px] bg-slate-800 rounded-lg"></div>
            </div>
          </div>
        </div>
      ) : animeData ? (
        <LinkTo href={`/anime/${id}`} className="">
          <div
            className="bg-cover rounded-xl mx-auto backdrop-blur-xl w-full max-w-xs max-lg:max-w-sm max-xl:max-w-md"
            style={{
              backgroundImage: `url(http://localhost:1337${animeData.image.data.attributes.url})`,
            }}
          >
            <div
              className={`flex flex-col justify-between p-4 rounded-xl backdrop-blur-[20px] bg-gray-800 bg-opacity-60 gap-1`}
            >
              <div className="flex h-0 pb-[150%] relative px-2">
                <Rating className="absolute top-2">{animeData.score}</Rating>
                <img
                  className="absolute inset-0 h-full w-full object-cover select-none rounded-lg"
                  src={`http://localhost:1337${animeData.image.data.attributes.url}`}
                  alt=""
                />
              </div>
              <div className="flex flex-col justify-between gap-2">
                <div className="heading-five text-gray-50 py-4 h-11 hover:overflow-visible overflow-hidden">
                  {animeData.name}
                </div>

                {isLogged && cardWithButton && (
                  <div className="flex">
                    {buttontype ? (
                      <WantToWatchButton
                        id={id}
                        iswatched={iswatched}
                        isManagable={isManagable}
                        isInWantToWatchList={true}
                      />
                    ) : (
                      <WatchedButton
                        id={id}
                        iswatched={iswatched}
                        isManagable={isManagable}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </LinkTo>
      ) : (
        ""
      )}
    </div>
  );
}

export default AnimeCard;
