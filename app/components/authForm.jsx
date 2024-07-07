import { useState } from "react";
import Button from "./ui/button";
import { Blocks } from "react-loader-spinner";
import {
  authWithEmailPassword,
  loginWithEmailPassword,
  monitorAuthState,
} from "../utils/firebase/firebaseAuth";

function Form({ buttonText, ...props }) {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
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
    monitorAuthState(props.setIslogged);
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
    setIsLoading(true);
    if (loginData.email.length < 1 || loginData.password.length < 1) {
      setFormError("Some of the fields are filled in incorrectly");
    } else {
      let data;
      if (typeOfAuth == "login") {
        data = await loginWithEmailPassword(
          loginData.email,
          loginData.password
        );
      } else if (typeOfAuth == "register") {
        data = await authWithEmailPassword(loginData.email, loginData.password);
      }
      if (data) {
        setIsLoading(false);
      }
      if (data.Data.code) {
        console.log(data.Data);
        setFormError(data.Data.code.replace("auth/", "").replaceAll("-", " "));
        return 0;
      } else if (!data.Data.code) {
        console.log(data.Data);
        sendUserData(loginData.email);
        props.setModalVisible(false);
        console.log("Authentificated");
      }

      setFormError("");
    }
  }
  return (
    <div className="flex flex-col w-full gap-2">
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
        <div className="flex flex-col gap-3">
          <Button callback={() => authentificate("login")}>Login</Button>
          <Button callback={() => authentificate("register")}>SignUp</Button>
        </div>
      )}
    </div>
  );
}

export default Form;
