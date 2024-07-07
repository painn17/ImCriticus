"use client";
import React, { useState } from "react";
import User from "./user";
import LinkTo from "./ui/link";
import Modal from "../components/ui/modal";
import Form from "./authForm";
import { useEffect } from "react";
import { signInWithToken } from "../utils/firebase/firebaseAuth";
function Navigation() {
  // useEffect(() => {
  //   signInWithToken();
  // }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [isLogged, setIslogged] = useState(false);
  const [userData, setUserData] = useState("");
  return (
    <div className="flex w-full justify-between">
      <div className="flex">
        {isLogged ? (
          <div className="w-full flex flex-row justify-between">
            <LinkTo href={"/home"}>HomePage</LinkTo>
            <LinkTo href={"/games"}>Games Tierlist</LinkTo>
            <LinkTo href={"/movieslist"}>Movies Tierlist</LinkTo>
            <LinkTo href={"/serieslist"}>Series Tierlist</LinkTo>
          </div>
        ) : (
          <LinkTo href={"/home"}>HomePage</LinkTo>
        )}
      </div>
      <div>
        <User
          setModalVisible={setModalVisible}
          setIslogged={setIslogged}
          isLogged={isLogged}
          userData={userData}
        />
      </div>
      <Modal visible={modalVisible}>
        <Form
          buttonText={"SignUp"}
          setIslogged={setIslogged}
          setModalVisible={setModalVisible}
          userData={userData}
          setUserData={setUserData}
        ></Form>
      </Modal>
    </div>
  );
}

//Todo добавить отключение/включение элемента
export default Navigation;
