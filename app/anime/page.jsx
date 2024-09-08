"use client";
import React, { useState, useEffect } from "react";
import { getAnime, pagination } from "../services/animeApi/animeApi";
import { useSearchParams } from "next/navigation";
import {
  ArrowRightIcon,
  FilterIcon,
  SearchIcon,
} from "../components/ui/icons/icons";
import CustomInput from "../components/ui/input";
import AnimeCard from "../components/animeCard";
import Popup from "../components/ui/popup";
import { useAuth } from "../context/AuthContext";
import Select from "react-select";
import { Oval } from "react-loader-spinner";
import { Pagination } from "@mui/material";
import CustomButton from "../components/ui/button";
import BackButton from "@/app/components/ui/back";
import CustomSelect from "../components/ui/customSelect";
import Loader from "../components/ui/loader";

function Anime() {
  const [anime, setAnime] = useState([]);
  const [paginationData, setPaginationData] = useState([]);
  const [sortedAnime, setSortedAnime] = useState("name");
  const [order, setOrder] = useState(true);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [searchQuerry, setSearchQuerry] = useState("");
  const [genreSort, setGenreSort] = useState([]);
  const [pageCardsQuantity, setPageCardsQuantity] = useState(8);
  const [pageNumber, setpageNumber] = useState(1);
  const path = useSearchParams();
  console.log(path.get("genre"));

  const placeholderData = [0, 1, 2, 3];
  const { isLogged, userData } = useAuth();
  const options = [
    { value: "name", label: "Name" },
    { value: "score", label: "Rating" },
    { value: "episodes", label: "Episodes" },
    // { value: "watched", label: "Watched" },
  ];

  const genres = [
    { value: "Action", label: "Action" },
    { value: "Adventure", label: "Adventure" },
    { value: "Comedy", label: "Comedy" },
    { value: "Crime", label: "Crime" },
    { value: "Documentary", label: "Documentary" },
    { value: "Drama", label: "Drama" },
    { value: "Fantasy", label: "Fantasy" },
    { value: "Horror", label: "Horror" },
    { value: "Mystery", label: "Mystery" },
    { value: "Romance", label: "Romance" },
    { value: "Sci-Fi", label: "Sci-Fi" },
    { value: "Sport", label: "Sport" },
    { value: "Thriller", label: "Thriller" },
    { value: "Family", label: "Family" },
    { value: "Isekai", label: "Isekai" },
    { value: "Superhero", label: "Superhero" },
    { value: "Slice of Life", label: "Slice of Life" },
  ];

  // const cardsQuatntityOptions = [
  //   { value: 16, label: "16" },
  //   { value: 24, label: "24" },
  //   { value: 36, label: "36" },
  // ];

  const sx = {
    "& .MuiPaginationItem-root": {
      color: "#5A4AF4", // Цвет текста
    },
    "& .MuiPaginationItem-page.Mui-selected": {
      backgroundColor: "#5A4AF4", // Цвет фона для выбранной страницы
      color: "#fff", // Цвет текста на выбранной странице
    },
    "& .MuiPaginationItem-ellipsis": {
      color: "#5A4AF4", // Цвет для многоточия
    },
    "& .MuiPaginationItem-root:hover": {
      backgroundColor: "#5A4AF4", // Цвет фона при наведении
      color: "#fff", // Цвет текста при наведении
    },
  };

  const handleSearchQuerryChange = (event) => {
    const data = event.target.value;
    // const capitalizedData = data.charAt(0).toUpperCase() + data.slice(1);
    console.log(data);
    setSearching(true);
    setSearchQuerry(data);
  };
  const handleSortingAnimeChange = (event) => {
    const { value } = event;
    setSortedAnime(value);
  };

  const handleGenreChange = (selectedOptions) => {
    const selectedGenres = selectedOptions
      ? selectedOptions.map((option) => option)
      : [];
    setGenreSort(selectedGenres);
    console.log(genreSort);
  };

  const fetchAnime = async (genreParam) => {
    const side = order ? "asc" : "desc";
    const genre = genreParam || genreSort;
    const animeData = await pagination(
      sortedAnime,
      side,
      pageNumber,
      pageCardsQuantity,
      searchQuerry,
      genre
    );
    setAnime(animeData.data.data);
    setPaginationData(animeData.data.meta.pagination);
    console.log(animeData);
    setIsLoading(false);
  };
  useEffect(() => {
    if (searching) {
      setTimeout(() => {
        fetchAnime();
        setSearching(false);
      }, 1500);
    } else {
      fetchAnime();
    }
  }, [
    sortedAnime,
    order,
    searchQuerry,
    pageNumber,
    pageCardsQuantity,
    userData,
    genreSort,
  ]);

  useEffect(() => {
    const sort = path.get("genre");
    console.log(sort, sort?.length, typeof sort);

    if (sort && sort.length > 0) {
      const selectedOption = genres.find((option) => option.value === sort);
      console.log(selectedOption);

      setGenreSort([selectedOption]);
      fetchAnime([selectedOption]);
    }
  }, [path]);

  return (
    <div className="p-4 space-y-12">
      <BackButton></BackButton>
      <div className="heading-one text-gray-50">All Anime</div>
      <div className=" w-fit h-fit flex flex-row max-md:flex-col max-md:items-start items-center justify-center gap-4">
        <div>
          <CustomInput
            value={searchQuerry}
            handleValueChange={handleSearchQuerryChange}
            icon={<SearchIcon />}
            icon2={<Loader loading={searching}></Loader>}
            iconSide="l"
            placeholder={"Search Anime"}
          ></CustomInput>
        </div>
        <div className="flex flex-row-reverse items-center gap-4">
          <div className="w-full rounded-xl h-full flex items-center gap-4">
            <CustomSelect
              options={options}
              defaultValue={{ value: "name", label: "Name" }}
              handler={(event) => {
                handleSortingAnimeChange(event);
              }}
            ></CustomSelect>
            <div className="flex flex-row items-center justify-center gap-4">
              {/* <div className="text-gray-50 ">Order: </div> */}
              <CustomButton buttonstyle={false}>
                <div
                  onClick={() => {
                    setOrder(!order);
                  }}
                >
                  <div className="rotate-90">
                    <div>
                      <ArrowRightIcon
                        strokeColor={order ? "white" : "var(--primary)"}
                      ></ArrowRightIcon>
                    </div>
                    <div className="rotate-180">
                      <ArrowRightIcon
                        strokeColor={order ? "var(--primary)" : "white"}
                      ></ArrowRightIcon>
                    </div>
                  </div>
                </div>
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center w-full gap-4">
          <div className="body-regular text-gray-400">Genres: </div>
          <CustomSelect
            options={genres}
            value={genreSort}
            style="min-w-52"
            isMulti={true}
            handler={(option) => handleGenreChange(option)}
          ></CustomSelect>
        </div>
        <div className=" body-regular text-gray-400 max-md:mx-auto">
          {paginationData?.total} Anime total
        </div>
        <div className="max-md:mx-auto">
          {anime.length > 0 && paginationData?.pageCount > 1 ? (
            <Pagination
              count={paginationData?.pageCount}
              page={pageNumber}
              sx={sx}
              size="large"
              onChange={(event, value) => {
                setpageNumber(value);
              }}
            ></Pagination>
          ) : (
            ""
          )}
        </div>
        {/* <div className="flex flex-row items-center gap-4">
          <Select
            options={cardsQuatntityOptions}
            styles={customStyles}
            defaultValue={{ value: 16, label: "16" }}
            onChange={(event) => {
              handlePageCardsChange(event);
            }}
          ></Select>
        </div> */}

        <div className="pt-4 grid  sm:grid-cols-3 md:grid-cols-6 xl:grid-cols-9 2xl:grid-cols-12 gap-6 ">
          {isLoading ? (
            placeholderData.map((item) => {
              return (
                <AnimeCard
                  key={item}
                  id={anime.id}
                  placeholder={true}
                  buttonCallback={() => setVisible(true)}
                ></AnimeCard>
              );
            })
          ) : anime.length > 0 ? (
            anime.map((item) => {
              return (
                <AnimeCard
                  key={item.id}
                  id={item.id}
                  cardWithButton={isLogged ? true : false}
                  buttonCallback={() => setVisible(true)}
                  isManagable={false}
                ></AnimeCard>
              );
            })
          ) : (
            <div className="text-gray-50 heading-three col-span-full  text-center">
              Nothing here
            </div>
          )}
          <Popup visible={visible} setVisible={setVisible}></Popup>
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div className="max-md:mx-auto">
          {anime.length > 0 && paginationData?.pageCount > 1 ? (
            <Pagination
              count={paginationData?.pageCount}
              page={pageNumber}
              sx={sx}
              size="large"
              onChange={(event, value) => {
                setpageNumber(value);
              }}
            ></Pagination>
          ) : (
            ""
          )}
        </div>
        {/* <Select
          options={cardsQuatntityOptions}
          styles={customStyles}
          defaultValue={{ value: 16, label: "16" }}
          onChange={(event) => {
            handlePageCardsChange(event);
          }}
        ></Select> */}
      </div>
    </div>
  );
}

export default Anime;
