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

export const updatePet = async (oldName, pet, username) => {
  try {
    const response = await api.post(API_PATHS.UPDATE_PET, {username: username, pet: pet, oldName: oldName},  {
      credentials: "include",
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const addClinic= async (clinic, username) => {
  try {
    const response = await api.post(API_PATHS.ADD_CLINIC, {username: username, clinic: clinic}, {
      credentials: "include",
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getClinics = async (user) => {
  try {
    const response = await api.post(API_PATHS.GET_CLINICS, user , {
      credentials: "include",
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const removeClinic = async (clinic, username) => {
  try {
    const response = await api.post(API_PATHS.REMOVE_CLINIC, {username: username, clinic: clinic},  {
      credentials: "include",
    });
    return response;
  } catch (error) {
    return error.response;
  }
};