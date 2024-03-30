export const nameRegex = /^[a-z ,.'-]+$/i;

export const emailRegex = /^\S+@\S+\.\S+$/;

export const mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

export const avatarRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
