"use client";
import React, { useState, useEffect } from "react";
import { getGames } from "../utils/gamesApi/gamesApi";
import GameCard from "../components/gameCard";

function Games() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const gamesData = await getGames();
      setGames(gamesData.results);
    };
    fetchGames();
  }, []);
  console.log(games);
  return <GameCard data={games}></GameCard>;
}

export default Games;
