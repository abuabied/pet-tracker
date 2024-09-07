export const REGISTRATION_MESSAGES = {
  INVALID_PASSWORD_LENGTH: "Password must be between 6 to 12 charachters long!",
  INVALID_NAME: "Make sure you entered a valid name! (no spaces or numbers, minimum 3 letters)",
  INVALID_USERNAME_TOO_SHORT: "UserName must be at least 3 characters long!",
  INVALID_PASSWORD_NO_LETTER_OR_HAS_SPACE:
    "Password must has at least 1 letter and no spaces!",
  INVALID_PASSWORD_NO_DIGIT: "Password must has at least 1 digit!",
  INVALID_PASSWORD_PASSWORDS_DONT_MATCH: "Passwords don't match!",
  INVALID_USERNAME_HAS_SPACE: "Username can't contain spaces!",
  INVALID_NO_USERNAME: "Provide a Username!",
  INVALID_EMAIL: "Enter a valid Email!",
  REGISTERED: "You are now registered!",
  INVALID_USERNAME_ALREADY_EXIST: "Username already exists!",
  ERROR_GENERAL: "Something happend!",
};

export const LOGIN_MESSAGES = {
  LOGGED_IN: "Welcome!",
  INVALID_CREDINTIALS: "Invalid Login credintials!",
  ERROR_GENERAL: "Something happend!",
};

export const UPDATE_MESSAGES = {
  UPDATED: "Information updated!",
  ERROR_GENERAL: "Something happend!",
};

export const API_PATHS = {
  LOGIN: "/user/login",
  REGISTER: "/user/register",
  GET_USER: "/user/getUser",
  UPDATE_USER: "/user/update",
  ADD_PET: "/user/addPet",
  REMOVE_PET: "/user/removePet",
  GET_PETS: "/user/getPets",
  UPDATE_PET: "/user/updatePet",
  ADD_CLINIC: "/user/addClinic",
  REMOVE_CLINIC: "/user/removeClinic",
  GET_CLINICS: "/user/getClinics",
  UPDATE_CLINIC: "/user/updateClinic",
};

export const COOKIES_IDS = {
  USERNAME: "username",
};

export const GENERAL_MESSAGES = {
  REFRESH: "Something went wrong! Please refresh the page.",
  LOGIN_BEFORE_ACTION: "Login first!",
}

export const PETS_MESSAGES = {
  ADDED: "New pet is added.",
  ERROR_GENERAL: "Something happend!",
}