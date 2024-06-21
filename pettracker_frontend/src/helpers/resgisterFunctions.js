import passwordValidator from "password-validator";
import isEmail from "validator/lib/isEmail";
import { REGISTRATION_MESSAGES } from "../consts/StringConsts";

export const validateRegisterData = (data) => {
  let errors = [];
  let c1 = validateName(data?.firstName);
  if (c1 !== true) {
    errors.push(c1);
    return errors;
  }

  let c2 = validateName(data?.lastName);
  if (c2 !== true) {
    errors.push(c2);
    return errors;
  }

  if (data?.username === "") {
    errors.push(REGISTRATION_MESSAGES.INVALID_NO_USERNAME);
    return errors;
  }

  c1 = validateUserName(data?.username);
  if (c1 !== true) {
    errors.push(c1);
    return errors;
  }

  if (data?.email !== "") {
    c1 = isEmail(data?.email) ? true : REGISTRATION_MESSAGES.INVALID_EMAIL;
    if (c1 !== true) {
      errors.push(c1);
      return errors;
    }
  }

  errors.push(validatePasswordLength(data?.password));
  errors.push(validatePasswordContentLetters(data?.password));
  errors.push(validatePasswordContentDigit(data?.password));
  return errors.filter((err) => err !== true);
};

export const validateUpdatedData = (data) => {
  let errors = [];
  let c1 = validateName(data?.firstName);
  if (c1 !== true) {
    errors.push(c1);
    return errors;
  }

  let c2 = validateName(data?.lastName);
  if (c2 !== true) {
    errors.push(c2);
    return errors;
  }

  if (data?.email !== "") {
    c1 = isEmail(data?.email) ? true : REGISTRATION_MESSAGES.INVALID_EMAIL;
    if (c1 !== true) {
      errors.push(c1);
    }
    return errors;
  }

  errors.push(validatePasswordLength(data?.password));
  errors.push(validatePasswordContentLetters(data?.password));
  errors.push(validatePasswordContentDigit(data?.password));
  return errors.filter((err) => err !== true);
};

const validatePasswordLength = (password) => {
  const schema = new passwordValidator();
  schema
    .is()
    .min(6) // Minimum length 6
    .is()
    .max(100); // Maximum length 100
  return schema.validate(password)
    ? true
    : REGISTRATION_MESSAGES.INVALID_PASSWORD_LENGTH;
};

const validatePasswordContentLetters = (password) => {
  const schema = new passwordValidator();
  const schema2 = new passwordValidator();
  schema.is().has().uppercase().has().not().spaces();
  schema2.is().has().lowercase().has().not().spaces();

  return schema.validate(password) || schema2.validate(password)
    ? true
    : REGISTRATION_MESSAGES.INVALID_PASSWORD_NO_LETTER_OR_HAS_SPACE;
};

const validatePasswordContentDigit = (password) => {
  const schema = new passwordValidator();
  schema.is().has().digits(1);

  return schema.validate(password)
    ? true
    : REGISTRATION_MESSAGES.INVALID_PASSWORD_NO_DIGIT;
};

const validateName = (name) => {
  const valid = Boolean(name?.match(/^[A-Za-z]*$/)) && name?.length >= 3;
  return valid ? true : REGISTRATION_MESSAGES.INVALID_NAME;
};

const validateUserName = (name) => {
  if (name?.length < 3) {
    return REGISTRATION_MESSAGES.INVALID_USERNAME_TOO_SHORT;
  }
  const schema = new passwordValidator();
  schema.has().not().spaces();
  return schema.validate(name)
    ? true
    : REGISTRATION_MESSAGES.INVALID_USERNAME_HAS_SPACE;
};
