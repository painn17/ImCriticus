import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";
import qs from "qs";
import { useSnackbar } from "@/app/context/SnackBarContext";

export function useUserActivity() {
  const token = localStorage.getItem("JWTtoken");
  // const { userData } = useAuth();
  const { showSnackbar } = useSnackbar();
  const changeUserName = async (username, id) => {
    if (!token) {
      console.error("No JWT token found in localStorage");
      return null;
    }
    console.log(username);

    try {
      const response = await axios.put(
        `http://localhost:1337/api/users/${id}`,
        { username: username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showSnackbar(`Now your name is ${username}`, "success");
      return response;
    } catch (error) {
      console.error("Failed to change username", error);
      showSnackbar("Failed to change username.", "error");
      return null;
    }
  };

  const getUser = async (id) => {
    const params = {
      populate: {
        animeWatched: { fields: ["id"] },
        wantToWatch: { fields: ["id"] },
        suggestions_to_me: { populate: "*" },
        my_suggestions: { populate: "*" },
        reviews: { populate: "*" },
        user_picture: { fields: ["url"] },
        favorite_anime: { fields: ["id"] },
        friends_request_in: { populate: "*" },
        friends_request_out: { populate: "*" },
        friends: { populate: "*" },
      },
    };
    const queryString = qs.stringify(params, { encode: false });
    try {
      const response = await axios.get(
        `http://localhost:1337/api/users/${id}?${queryString}`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user data", error);
      return null;
    }
  };

  const updateUserData = async () => {
    if (!token) {
      console.error("No JWT token found in localStorage");
      return null;
    }

    const params = {
      populate: {
        animeWatched: { fields: ["id"] },
        wantToWatch: { fields: ["id"] },
        suggestions_to_me: { populate: "*" },
        my_suggestions: { populate: "*" },
        reviews: { populate: "*" },
        user_picture: { fields: ["url"] },
        favorite_anime: { fields: ["id"] },
        friends_request_in: { populate: "*" },
        friends_request_out: { populate: "*" },
        friends: { populate: "*" },
      },
    };
    const queryString = qs.stringify(params, { encode: false });
    try {
      const response = await axios.get(
        `http://localhost:1337/api/users/me?${queryString}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Failed to update user data", error);
      return null;
    }
  };

  const sendFriendsRequest = async (friendData, userId) => {
    if (!token) {
      console.error("No JWT token found in localStorage");
      return null;
    }
    try {
      const response = await axios.put(
        `http://localhost:1337/api/users/${friendData.id}`,
        {
          friends_request_in: [...friendData.friends_request_in, userId],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      showSnackbar("Friend request sent successfully!", "success");
      return response.data;
    } catch (error) {
      console.error("Failed to send friend request", error);
      showSnackbar("Failed to send friend request.", "error");
      return null;
    }
  };

  const acceptFriendsRequest = async (friendData, userData) => {
    if (!token) {
      console.error("No JWT token found in localStorage");
      return null;
    }
    const updatedFriendsRequestIn = userData.friends_request_in.filter(
      (item) => item.id !== friendData.id
    );
    try {
      const requestIn = await axios.put(
        `http://localhost:1337/api/users/${userData.id}`,
        { friends_request_in: updatedFriendsRequestIn },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const requestAcceptYour = await axios.put(
        `http://localhost:1337/api/users/${userData.id}`,
        { friends: [...userData.friends, friendData.id] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const requestAcceptFriends = await axios.put(
        `http://localhost:1337/api/users/${friendData.id}`,
        { friends: [...friendData.friends, userData.id] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(requestIn, requestAcceptYour, requestAcceptFriends);
      showSnackbar("Friend request accepted successfully!", "success");
    } catch (error) {
      console.error("Failed to accept friend request", error);
      showSnackbar("Failed to accept friend request.", "error");
      return null;
    }
  };

  const declineFriendsRequest = async (friendData, userData) => {
    if (!token) {
      console.error("No JWT token found in localStorage");
      return null;
    }
    const updatedFriendsRequestIn = userData.friends_request_in.filter(
      (item) => item.id !== friendData.id
    );
    try {
      const response = await axios.put(
        `http://localhost:1337/api/users/${userData.id}`,
        { friends_request_in: updatedFriendsRequestIn },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      showSnackbar("Friend request declined successfully!", "success");
      return response.data;
    } catch (error) {
      console.error("Failed to decline friend request", error);
      showSnackbar("Failed to decline friend request.", "error");
      return null;
    }
  };

  const deleteFriend = async (friendData, userData) => {
    if (!token) {
      console.error("No JWT token found in localStorage");
      return null;
    }
    const updatedFriends = userData.friends.filter(
      (item) => item.id !== friendData.id
    );
    const updatedFriendsSecond = friendData.friends.filter(
      (item) => item.id !== userData.id
    );
    try {
      const requestDeleteYourFriend = await axios.put(
        `http://localhost:1337/api/users/${userData.id}`,
        { friends: updatedFriends },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const requestDeleteFriend = await axios.put(
        `http://localhost:1337/api/users/${friendData.id}`,
        { friends: updatedFriendsSecond },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(requestDeleteYourFriend, requestDeleteFriend);
      showSnackbar("Friend deleted successfully!", "success");
    } catch (error) {
      console.error("Failed to delete friend", error);
      showSnackbar("Failed to delete friend.", "error");
      return null;
    }
  };

  return {
    changeUserName,
    getUser,
    updateUserData,
    sendFriendsRequest,
    acceptFriendsRequest,
    declineFriendsRequest,
    deleteFriend,
  };
}
