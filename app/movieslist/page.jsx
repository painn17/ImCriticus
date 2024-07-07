"use client";
import React, { useState, useEffect } from "react";
import { getFilms } from "../utils/filmApi/filmsApi";
import FilmCard from "../components/filmCard";

function Films() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetchFilms = async () => {
      const gamesData = await getFilms();
      setFilms(gamesData.results);
    };
    fetchFilms();
  }, []);
  return <FilmCard data={films}></FilmCard>;
}

export default Films;
