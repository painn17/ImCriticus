"use client";
import { useAuth } from "../context/AuthContext";
import LinkTo from "./ui/link";
import { ArrowRightIcon, Burger, LogoIcon } from "./ui/icons/icons";
import User from "./user";
import CustomButton from "./ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
function Navigation({ burgerOpen, setBurgerOpen }) {
  const router = useRouter();
  const { setIsLogged, isLogged, userData, setUserData } = useAuth();
  async function logout(event) {
    event.stopPropagation();
    event.preventDefault();
    setIsLogged(false);
    setUserData();
    localStorage.setItem("JWTtoken", "");
    router.push("/home");
  }
  return (
    <nav
      onClick={() => {
        burgerOpen ? setBurgerOpen(false) : "";
      }}
      className=" bg-gray-900 py-4 px-10 w-full sticky top-0 z-[9999] opacity-100"
    >
      <div className=" container flex flex-row mx-auto justify-between items-center ">
        <div>
          <LinkTo href={"/home"}>
            <LogoIcon />
          </LinkTo>
        </div>
        <div className="flex flex-row items-center w-fit whitespace-nowrap">
          <div className={burgerOpen ? "hidden" : ""}>
            <CustomButton
              callback={() => {
                setBurgerOpen(!burgerOpen);
              }}
              buttonstyle={false}
            >
              <div className="lg:hidden">
                <Burger strokeColor="var(--primary)"></Burger>
              </div>
            </CustomButton>
          </div>
          <div
            className={`flex w-full gap-5 justify-end items-center px-4 ${
              burgerOpen ? "max-lg:flex" : "max-lg:hidden"
            } max-lg:flex-col max-lg:absolute max-lg:right-0 max-lg:top-0 max-lg:w-fit max-lg:h-screen bg-opacity-80 bg-gray-900 max-lg:bg-blur max-lg:z-10 max-lg:py-10`}
          >
            <LinkTo href={"/anime"}>
              <div>Anime List</div>
            </LinkTo>

            {isLogged ? (
              <>
                <LinkTo href={`/user/${userData?.id}/friends`}>Friends</LinkTo>
                <User></User>
                <div className="max-lg:mt-auto max-lg:w-full max-lg:flex max-lg:justify-end px-4">
                  <CustomButton
                    buttonstyle={false}
                    callback={(event) => {
                      logout(event);
                    }}
                  >
                    <div className="text-[var(--error)]">Logout</div>
                  </CustomButton>
                </div>
              </>
            ) : (
              <div className="max-lg:mt-auto max-lg:w-full max-lg:flex max-lg:justify-end px-4">
                <LinkTo href={"/auth"}>
                  <p className="">Signin/Login</p> <ArrowRightIcon />
                </LinkTo>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

//Todo добавить отключение/включение элемента
export default Navigation;
