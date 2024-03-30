import {
  avatarRegex,
  emailRegex,
  mobileRegex,
  nameRegex
} from '../constants.js';
export const isNameValidate = (name) => nameRegex.test(name);

export const isEmailValidate = (email) => emailRegex.test(email);

export const isMobileNumber = (number) => mobileRegex.test(number);

export const isAvatarValid = (avatar) => avatarRegex.test(avatar);
