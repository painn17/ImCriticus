import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";
import qs from "qs";
import { useSnackbar } from "@/app/context/SnackBarContext";
export function useUserAnimeActivity() {
  const token = localStorage.getItem("JWTtoken");
  const { userData } = useAuth();
  const { showSnackbar } = useSnackbar();

  const addToWatched = async (animeId) => {
    try {
      console.log("sending watched", userData.id, userData);

      if (!token) throw new Error("No JWT token found");

      const response = await axios.put(
        `http://localhost:1337/api/users/${userData.id}`,
        {
          animeWatched: [...userData.animeWatched, animeId],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      showSnackbar("Added to Watched list successfully!", "success");
    } catch (error) {
      console.error("Failed to add to watched", error);
      showSnackbar("Failed to add to Watched list.", "error");
    }
  };

  const deleteWatched = async (id) => {
    try {
      console.log("sending deleted", userData.id, userData);

      if (!token) throw new Error("No JWT token found");

      const updatedAnimeWatched = userData.animeWatched.filter(
        (item) => item.id !== id
      );

      const response = await axios.put(
        `http://localhost:1337/api/users/${userData.id}`,
        {
          animeWatched: updatedAnimeWatched,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      showSnackbar("Removed from Watched list successfully!", "success");
    } catch (error) {
      console.error("Failed to delete watched", error);
      showSnackbar("Failed to remove from Watched list.", "error");
    }
  };

  const addToWantWatch = async (id) => {
    try {
      console.log("sending wantToWatch", id);

      if (!token) throw new Error("No JWT token found");

      const response = await axios.put(
        `http://localhost:1337/api/users/${userData.id}?wantToWatch/${id}`,
        {
          wantToWatch: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      showSnackbar("Added to Want to Watch list successfully!", "success");
    } catch (error) {
      console.error("Failed to add to Want to Watch list", error);
      showSnackbar("Failed to add to Want to Watch list.", "error");
    }
  };

  const deleteWantWatch = async (id) => {
    try {
      console.log("sending deleted", id, userData);

      if (!token) throw new Error("No JWT token found");

      const updatedWantWatch = userData.wantToWatch.filter(
        (item) => item.id !== id
      );

      const response = await axios.put(
        `http://localhost:1337/api/users/${userData.id}`,
        {
          wantToWatch: updatedWantWatch,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      showSnackbar("Removed from Want to Watch list successfully!", "success");
    } catch (error) {
      console.error("Failed to remove from Want to Watch list", error);
      showSnackbar("Failed to remove from Want to Watch list.", "error");
    }
  };

  const getUserAnimeReviews = async (userId, animeId, sortValue, side) => {
    console.log(userId, animeId, sortValue, side);

    try {
      const params = {
        populate: {
          reviewRateUp: {
            populate: "*",
          },
          reviewRateDown: {
            populate: "*",
          },
          anime: {
            populate: "id",
          },
          user: {
            populate: "id",
          },
        },
        filters: {},
      };

      if (userId) {
        params.filters.user = { id: { $eq: userId } };
      }

      if (animeId) {
        params.filters.anime = { id: { $eq: animeId } };
      }
      if (sortValue && side) {
        params.sort = [`${sortValue}:${side}`];
      }

      const queryString = qs.stringify(params, { addQueryPrefix: true });

      const response = await axios.get(
        `http://localhost:1337/api/reviews${queryString}`
      );

      console.log(response, sortValue);
      return response;
    } catch (error) {
      console.error("Failed to get reviews", error);
    }
  };

  const addReview = async (text, score, animeid) => {
    try {
      console.log("sending review", userData.id, userData);

      if (!token) throw new Error("No JWT token found");

      const response = await axios.post(
        `http://localhost:1337/api/reviews`,
        {
          data: {
            user: userData.id,
            anime: animeid,
            review_text: text,
            score: score,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      showSnackbar("Review added successfully!", "success");
      return response;
    } catch (error) {
      console.error("Failed to add review", error);
      showSnackbar("Failed to add review.", "error");
    }
  };

  const deleteReview = async (id) => {
    try {
      console.log("sending deleted review", id);

      if (!token) throw new Error("No JWT token found");

      const response = await axios.delete(
        `http://localhost:1337/api/reviews/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      showSnackbar("Review deleted successfully!", "success");
    } catch (error) {
      console.error("Failed to delete review", error);
      showSnackbar("Failed to delete review.", "error");
    }
  };

  const rateReview = async (id, userId, score) => {
    try {
      console.log("sending rate review", id);

      if (!token) throw new Error("No JWT token found");

      const rateProperty = score ? "reviewRateUp" : "reviewRateDown";

      // Сначала получаем текущие данные
      const params = {
        populate: {
          reviewRateUp: {
            populate: "*",
          },
          reviewRateDown: {
            populate: "*",
          },
        },
      };

      const queryString = qs.stringify(params, { addQueryPrefix: true });

      const existingReview = await axios.get(
        `http://localhost:1337/api/reviews/${id}${queryString}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(
        existingReview,
        existingReview.data.data.attributes[rateProperty].data
      );

      // Извлекаем текущие значения поля reviewRateUp или reviewRateDown
      const currentVotes =
        existingReview.data.data.attributes[rateProperty].data.map(
          (user) => user.id
        ) || [];
      console.log(currentVotes, rateProperty);
      // Добавляем новый ID пользователя, если его еще нет
      if (!currentVotes.includes(userId)) {
        currentVotes.push(userId);
      }

      // Обновляем данные на сервере
      const response = await axios.put(
        `http://localhost:1337/api/reviews/${id}`,
        { data: { [rateProperty]: currentVotes } },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      showSnackbar("Review rated successfully!", "success");
    } catch (error) {
      console.error("Failed to rate review", error);
      showSnackbar("Failed to rate review.", "error");
    }
  };

  const addFavoriteAnime = async (animeId) => {
    if (!token) throw new Error("No JWT token found");
    try {
      const response = await axios.put(
        `http://localhost:1337/api/users/${userData.id}`,
        {
          favorite_anime: animeId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      showSnackbar("Added to Favorite Anime successfully!", "success");
    } catch (error) {
      console.error("Failed to add to Favorite Anime", error);
      showSnackbar("Failed to add to Favorite Anime.", "error");
    }
  };

  const deleteFavoriteAnime = async () => {
    if (!token) throw new Error("No JWT token found");
    try {
      const response = await axios.put(
        `http://localhost:1337/api/users/${userData.id}`,
        {
          favorite_anime: [],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      showSnackbar("Removed from Favorite Anime successfully!", "success");
    } catch (error) {
      console.error("Failed to remove from Favorite Anime", error);
      showSnackbar("Failed to remove from Favorite Anime.", "error");
    }
  };

  const sendSuggestion = async (suggestion) => {
    if (!token) throw new Error("No JWT token found");
    try {
      const response = await axios.post(
        `http://localhost:1337/api/suggestions`,
        {
          data: suggestion,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      showSnackbar("Suggestion sent successfully!", "success");
    } catch (error) {
      console.error("Failed to send suggestion", error);
      showSnackbar("Failed to send suggestion.", "error");
    }
  };

  const deleteSuggestion = async (suggestionId) => {
    if (!token) throw new Error("No JWT token found");
    try {
      const response = await axios.delete(
        `http://localhost:1337/api/suggestions/${suggestionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      showSnackbar("Suggestion deleted successfully!", "success");
    } catch (error) {
      console.error("Failed to delete suggestion", error);
      showSnackbar("Failed to delete suggestion.", "error");
    }
  };

  const declineSuggestion = async (suggestionId) => {
    if (!token) throw new Error("No JWT token found");
    try {
      const response = await axios.put(
        `http://localhost:1337/api/suggestions/${suggestionId}`,
        {
          data: {
            isAccepted: false,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      showSnackbar("Suggestion declined successfully!", "success");
    } catch (error) {
      console.error("Failed to decline suggestion", error);
      showSnackbar("Failed to decline suggestion.", "error");
    }
  };

  const acceptSuggestion = async (suggestionId) => {
    if (!token) throw new Error("No JWT token found");
    try {
      const response = await axios.put(
        `http://localhost:1337/api/suggestions/${suggestionId}`,
        {
          data: {
            isAccepted: true,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      showSnackbar("Suggestion accepted successfully!", "success");
    } catch (error) {
      console.error("Failed to accept suggestion", error);
      showSnackbar("Failed to accept suggestion.", "error");
    }
  };

  const watchedSuggestion = async (suggestionId) => {
    if (!token) throw new Error("No JWT token found");
    try {
      const response = await axios.put(
        `http://localhost:1337/api/suggestions/${suggestionId}`,
        {
          data: {
            isWatched: true,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      showSnackbar("Suggestion marked as watched successfully!", "success");
    } catch (error) {
      console.error("Failed to mark suggestion as watched", error);
      showSnackbar("Failed to mark suggestion as watched.", "error");
    }
  };

  return {
    addToWatched,
    deleteWatched,
    addReview,
    deleteReview,
    addToWantWatch,
    deleteWantWatch,
    addFavoriteAnime,
    deleteFavoriteAnime,
    sendSuggestion,
    deleteSuggestion,
    declineSuggestion,
    acceptSuggestion,
    watchedSuggestion,
    rateReview,
    getUserAnimeReviews,
  };
}
