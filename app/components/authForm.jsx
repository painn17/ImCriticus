import { useState } from "react";
import Button from "./ui/button";
import { Blocks } from "react-loader-spinner";
import {
  registerWithEmailPassword,
  loginWithEmailPassword,
  // monitorAuthState,
} from "../services/strapi/strapiAuth";

function Form({ buttonText, ...props }) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  function sendUserData(email) {
    props.setUserData(email);
    props.setIslogged(true);
    // monitorAuthState(props.setIslogged);
  }

  // async function login() {
  //   if (loginData.email.length < 1 || loginData.password.length < 1) {
  //     setFormError("Some of the fields are filled in incorrectly");
  //   } else {
  //     // props.setIslogged(true);

  //     let data = await loginWithEmailPassword(
  //       loginData.email,
  //       loginData.password
  //     );
  //     if (data.Data.code) {
  //       console.log(data.Data);
  //       setFormError(data.Data.code);
  //       return 0;
  //     } else if (!data.Data.code) {
  //       console.log(data.Data);
  //       sendUserData(loginData.email);
  //       props.setModalVisible(false);
  //       console.log("Authentificated");
  //     }
  //     setFormError("");
  //   }
  // }

  async function authentificate(typeOfAuth) {
    console.log(
      props.signinModalVisible,
      props.loginModalVisible,
      typeOfAuth,
      loginData
    );
    if (
      props.signinModalVisible === true &&
      (loginData.email.length < 1 ||
        loginData.password.length < 1 ||
        loginData.username.length < 1)
    ) {
      setFormError("Some of the fields are filled in incorrectly");
    } else {
      setIsLoading(true);
      let data;
      if (typeOfAuth == "login") {
        data = await loginWithEmailPassword(loginData);
      } else if (typeOfAuth == "register") {
        data = await registerWithEmailPassword(loginData);
      }
      if (data) {
        setIsLoading(false);
      }
      if (data.data) {
        console.log(data);
        setFormError(data.statusText);
        return 0;
      } else if (!data.data) {
        sendUserData(data.user.username);
        if (props.setsigninModalVisible) {
          props.setsigninModalVisible(false);
        } else {
          props.setloginModalVisible(false);
        }
        console.log("Authentificated");
      }

      setFormError("");
    }
  }
  return (
    <div className="flex flex-col w-full gap-2">
      {props.signinModalVisible ? (
        <div className="flex flex-row items-center text-black justify-between">
          <p>Username:</p>
          <input
            className="m-1 p-4 text-black border border-slate-500 rounded"
            type={"username"}
            placeholder="Example_123"
            value={loginData.username}
            name="username"
            onChange={handleInputChange}
          ></input>
        </div>
      ) : (
        ""
      )}
      <div className="flex flex-row items-center text-black justify-between">
        <p>Email:</p>
        <input
          className="m-1 p-4 text-black border border-slate-500 rounded"
          type={"email"}
          placeholder="example@ex.com"
          value={loginData.email}
          name="email"
          onChange={handleInputChange}
        ></input>
      </div>
      <div className="flex flex-row items-center text-black justify-between">
        <p>Password:</p>
        <input
          className="m-1 p-4 text-black border border-slate-500 rounded"
          type={"password"}
          name="password"
          placeholder="example123"
          value={loginData.password}
          onChange={handleInputChange}
        ></input>
      </div>
      <p
        className={
          formError.length > 2
            ? "text-red-600 text-center capitalize"
            : "text-red-600 text-center hidden"
        }
      >
        {formError}
      </p>
      {isLoading ? (
        <div className="mx-auto">
          <Blocks
            height="80"
            width="80"
            color="#ffffff"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-3 text-xl">
          {props.loginModalVisible ? (
            <Button callback={() => authentificate("login")}>Login</Button>
          ) : (
            <Button callback={() => authentificate("register")}>SignUp</Button>
          )}
        </div>
      )}
    </div>
  );
}

export default Form;
