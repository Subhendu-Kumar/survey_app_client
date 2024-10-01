import { SignInResponse, TOKEN_KEY, User, USER_DATA_KEY } from "./config";

export const saveUserData = (response: SignInResponse): void => {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(response.user));
  localStorage.setItem(TOKEN_KEY, response.token);
};

export const getUserData = (): User | null => {
  const userData = localStorage.getItem(USER_DATA_KEY);
  return userData ? (JSON.parse(userData) as User) : null;
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const clearUserData = (): void => {
  localStorage.removeItem(USER_DATA_KEY);
  localStorage.removeItem(TOKEN_KEY);
};
