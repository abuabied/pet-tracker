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
