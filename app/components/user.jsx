import React from "react";
import { useState } from "react";
import Button from "./ui/button";
import { authOut, monitorAuthState } from "../utils/firebase/firebaseAuth";
function User({ setModalVisible, setIslogged, isLogged, userData }) {
  async function logout() {
    authOut();
    monitorAuthState(setIslogged);
  }
  return (
    <div className="p-2 m-2 rounded">
      {isLogged ? (
        <div className="flex items-center gap-2">
          <div>{userData}</div>
          <Button callback={logout} mood={true}>
            Logout
          </Button>
        </div>
      ) : (
        <Button callback={() => setModalVisible(true)} mood={false}>
          Login
        </Button>
      )}
    </div>
  );
}

export default User;
