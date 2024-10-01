export const BASE_URL = "http://localhost:5000/api/v1";
export const USER_DATA_KEY = "userData";
export const TOKEN_KEY = "token";

export interface Data {
  username?: string;
  password: string;
  email: string;
}

export interface User {
  user_id: string;
  username: string;
  email: string;
}

export interface SignInResponse {
  message: string;
  token: string;
  user: User;
}
