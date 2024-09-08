"use client";
import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { useUserActivity } from "../services/strapi/useractions";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { updateUserData } = useUserActivity();
  const [isLogged, setIsLogged] = useState(false);
  const [userData, setUserData] = useState();

  useEffect(() => {
    const token = localStorage.getItem("JWTtoken");
    if (token) {
      const getData = async () => {
        const response = await updateUserData();

        setIsLogged(true);
        setUserData(response);
      };
      getData();
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLogged,
        setIsLogged,
        userData,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
