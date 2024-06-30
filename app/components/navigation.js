"use client";
import React from "react";
import User from "./user";
import LinkTo from "./ui/link";
import Link from "next/link";

function Navigation() {
  return (
    <div className="w-full flex flex-row justify-between">
      <div className="flex">
        <LinkTo href={"/home"} text={"Home"}></LinkTo>
        <LinkTo href={"/wishlist"} text={"Wishlist"}></LinkTo>
        <LinkTo href={"/games"} text={"Games Tierlist"}></LinkTo>
        <LinkTo href={"/movieslist"} text={"Movies Tierlist"}></LinkTo>
        <LinkTo href={"/serieslist"} text={"Series Tierlist"}></LinkTo>
      </div>
      <div>
        <User />
      </div>
    </div>
  );
}

//Todo добавить отключение/включение элемента
export default Navigation;
