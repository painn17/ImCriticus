"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useUserAnimeActivity } from "../services/strapi/userAnimeactions";
import { pagination } from "../services/animeApi/animeApi";
import { useEffect, useState } from "react";
import AnimeCard from "../components/animeCard";
import { useAuth } from "../context/AuthContext";
import { getHomePageData } from "../services/animeApi/animeApi";
import { ArrowRightIcon } from "../components/ui/icons/icons";
import Slider from "../components/ui/slider";
import CustomSlider from "../components/ui/slider";
function Home() {
  const [sliderData, setSliderData] = useState([]);
  const [homePageData, setHomePageData] = useState();
  const { isLogged, userData } = useAuth();

  const getHomePage = async () => {
    const data = await getHomePageData();
    console.log(data.data.data);
    setHomePageData(data.data.data);
  };

  useEffect(() => {
    getHomePage();
  }, []);

  const getSliderData = async () => {
    try {
      const allSlidersData = await Promise.all(
        homePageData.attributes.sliders.map(async (slider) => {
          const data = await pagination(slider.type, "desc", 1, 10); // Вызываем pagination с типом сортировки слайдера
          return {
            label: slider.label,
            animeList: data.data.data,
          };
        })
      );
      setSliderData(allSlidersData);
      console.log(allSlidersData);
    } catch (error) {
      console.error("Failed to get slider data:", error);
    }
  };

  useEffect(() => {
    if (homePageData) {
      getSliderData();
    }
  }, [homePageData]);

  return (
    <div className="py-4">
      {homePageData ? (
        sliderData.length > 0 ? (
          <>
            <div className="text-gray-50 heading-one max-md:heading-two">
              {homePageData.attributes.label}
            </div>
            {homePageData.attributes.sliders.map((slider) => {
              const currentSliderData = sliderData.find(
                (data) => data.label === slider.label
              );

              return (
                <div key={slider.label} className="flex flex-col gap-4 px-2">
                  <div className="text-gray-50 heading-two max-md:heading-four">
                    {slider.label}
                  </div>
                  {currentSliderData ? (
                    <CustomSlider>
                      {currentSliderData.animeList.map((anime) => {
                        return (
                          <div key={anime.id} className="p-4">
                            <AnimeCard
                              id={anime.id}
                              isManagable={false}
                            ></AnimeCard>
                          </div>
                        );
                      })}
                    </CustomSlider>
                  ) : (
                    <div>No data for this slider</div>
                  )}
                </div>
              );
            })}
          </>
        ) : (
          "Loading sliders..."
        )
      ) : (
        "Loading homepage data..."
      )}
    </div>
  );
}
export default Home;
