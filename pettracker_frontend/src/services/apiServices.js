import axios from "axios";
import api from "../api/axiosConfig";
import { API_PATHS } from "../consts/StringConsts";

export const registerUser = async (newUser) => {
  try {
    const response = await api.post(API_PATHS.REGISTER, newUser);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const loginUser = async (user) => {
  try {
    const response = await api.post(API_PATHS.LOGIN, user, {
      credentials: "include",
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getUser = async (user) => {
  try {
    const response = await api.post(API_PATHS.GET_USER, user, {
      credentials: "include",
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const updateUser = async (user) => {
  try {
    const response = await api.post(API_PATHS.UPDATE_USER, user, {
      credentials: "include",
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const searchGameByName = async (name) => {
  const options = {
    method: "GET",
    url: "https://opencritic-api.p.rapidapi.com/game/search",
    params: {
      criteria: name,
    },
    headers: {
      "X-RapidAPI-Key": "48b0fa711dmsh44b45238372593ep142911jsn4c777e50417f",
      "X-RapidAPI-Host": "opencritic-api.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response?.data;
  } catch (error) {
    return [];
  }
};

export const getGameById = async (id) => {
  const options = {
    method: "GET",
    url: `https://opencritic-api.p.rapidapi.com/game/${id}`,
    headers: {
      "X-RapidAPI-Key": "48b0fa711dmsh44b45238372593ep142911jsn4c777e50417f",
      "X-RapidAPI-Host": "opencritic-api.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response?.data;
  } catch (error) {
    return null;
  }
};

export const addGameToCollection = async (userGame) => {
  try {
    const response = await api.post(API_PATHS.ADD_GAME, userGame, {
      credentials: "include",
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const removeGameFromCollection = async (userGame) => {
  try {
    const response = await api.post(API_PATHS.REMOVE_GAME, userGame, {
      credentials: "include",
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getUserGamesCollection = async (user) => {
  try {
    const response = await api.post(API_PATHS.GET_GAMES_COLLECTION, user, {
      credentials: "include",
    });
    return response;
  } catch (error) {
    return error.response;
  }
};