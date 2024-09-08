"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import CustomInput from "../components/ui/input";
import CustomButton from "../components/ui/button";
import {
  MailIcon,
  KeyIcon,
  EyeIcon,
  CrossedEyeIcon,
} from "../components/ui/icons/icons";
import {
  registerWithEmailPassword,
  loginWithEmailPassword,
} from "../services/strapi/strapiAuth";
import LinkTo from "../components/ui/link";

function Auth({}) {
  const { setIsLogged, setUserData, userData, isLogged } = useAuth();
  const router = useRouter();
  const isLoggedEver = localStorage.getItem("isLoggedEver");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(isLoggedEver ? true : false); // Флаг для переключения между логином и регистрацией

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    if (isLogin) {
      setLoginData({
        ...loginData,
        [name]: value.replaceAll(" ", ""),
      });
    } else {
      setRegisterData({
        ...registerData,
        [name]: value.replaceAll(" ", ""),
      });
    }
  };

  const handleLogin = async () => {
    const response = await loginWithEmailPassword(loginData);
    if (response.jwt) {
      setUserData(response.user);
      setIsLogged(true);
      console.log("User data set in context:", response.user);
      router.push("/user/dashboard");
    } else {
      console.error("Login failed:", response.error);
    }
  };

  const handleRegister = async () => {
    const response = await registerWithEmailPassword(registerData);
    if (response.jwt) {
      setUserData(response.user);
      setIsLogged(true);
      router.push("/dashboard");
    } else {
      console.error("Registration failed:", response.error);
    }
  };

  return (
    <div className="grid-cols-6 max-lg:grid-cols-3 max-sm:grid-cols-1 gap-48 grid w-full">
      <img
        src="http://localhost:1337/uploads/Designer_a22039cf55.jpeg"
        alt=""
        className={`h-[80vh] rounded-xl col-span-3
        } max-xl:hidden`}
      />
      {isLogged ? (
        ""
      ) : (
        // <LinkTo>To User Page</LinkTo>
        <div className="gap-10 w-full col-span-3 flex flex-col justify-center max-lg:col-span-3 max-sm:col-span-1 max-xl:col-span-4 max-xl:col-start-2">
          <p className="heading-one text-gray-50">
            {isLogin ? "Login" : "Register"}
          </p>
          {!isLogin && (
            <CustomInput
              icon={<MailIcon />}
              placeholder={"Username"}
              inputname="username"
              value={registerData.username}
              handleValueChange={handleInputChange}
            />
          )}
          <CustomInput
            icon={<MailIcon />}
            type="email"
            placeholder={"Email"}
            inputname="email"
            value={isLogin ? loginData.email : registerData.email}
            handleValueChange={handleInputChange}
          />
          <CustomInput
            icon={<KeyIcon />}
            icon2={
              showPassword ? <CrossedEyeIcon></CrossedEyeIcon> : <EyeIcon />
            }
            type={showPassword ? "text" : "password"}
            placeholder={"Password"}
            inputname="password"
            value={isLogin ? loginData.password : registerData.password}
            handleValueChange={handleInputChange}
            callback={() => {
              setShowPassword(!showPassword);
            }}
          />
          <CustomButton callback={isLogin ? handleLogin : handleRegister}>
            <div className="py-4">{isLogin ? "Login" : "Register"}</div>
          </CustomButton>
          <div className="text-gray-400 text-center flex gap-2 justify-center">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Register" : "Login"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Auth;
