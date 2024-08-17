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

export const addPet = async (pet, username) => {
  try {
    const response = await api.post(API_PATHS.ADD_PET, {username: username, pet: pet}, {
      credentials: "include",
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getPets = async (user) => {
  try {
    const response = await api.post(API_PATHS.GET_PETS, user , {
      credentials: "include",
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const removePets = async (pet, username) => {
  try {
    const response = await api.post(API_PATHS.REMOVE_PET, {username: username, pet: pet},  {
      credentials: "include",
    });
    return response;
  } catch (error) {
    return error.response;
  }
};