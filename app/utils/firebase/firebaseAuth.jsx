// "use server";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  connectAuthEmulator,
  signOut,
  onAuthStateChanged,
  signInWithCustomToken,
} from "firebase/auth";
// import { cookies } from "next/headers";
import { firebaseConfig } from "../firebase/congif";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebaseui/dist/firebaseui.css";

let api = `"${process.env.REACT_APP_FIREBASE_API_KEY}"`;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// connectAuthEmulator(auth, "http://localhost:9099");
const db = getFirestore(app);

export async function loginWithEmailPassword(email, password) {
  try {
    const userData = await signInWithEmailAndPassword(auth, email, password);
    console.log(userData);
    localStorage.setItem("accessJWTtoken", userData.user.accessToken);
    return { isError: false, Data: userData };
  } catch (error) {
    return { isError: true, Data: error };
  }
}

export async function authWithEmailPassword(email, password) {
  try {
    const userData = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userData.user);
    localStorage.setItem("accessJWTtoken", userData.user.accessToken);
    return { isError: false, Data: userData };
  } catch (error) {
    return { isError: true, Data: error };
  }
}

export async function authOut() {
  await signOut(auth);
  // setCookie("", 0);
}

export async function monitorAuthState(setIslogged) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // let cook = cookies.getAll("loginCookie");
      setIslogged(true);
    } else {
      console.log("logout");
      setIslogged(false);
    }
  });
}

export async function signInWithToken() {
  console.log("using token");
  let localToken = localStorage.getItem("accessJWTtoken");
  if (localToken.length > 2) {
    signInWithCustomToken(auth, localToken);
  }
}

// export async function setCookie(userData, cookieAge) {
//   cookies().set({
//     name: "loginCookie",
//     value: userData,
//     maxAge: 60 * 60 * cookieAge,
//   });
// }
