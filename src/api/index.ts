import axios from "axios";
import { BASE_URL, Data, Form } from "../config";
import { getToken } from "@/utils";

const API = axios.create({
  baseURL: BASE_URL,
});

const token = getToken();

API.interceptors.request.use((req) => {
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const login = async (data: Data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signin`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const register = async (data: Data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signup`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createForm = async (formId: string, data: Form) => {
  try {
    const response = await API.post("/form/create", { formId, data });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getForm = async (formId: string) => {
  try {
    const response = await API.get(`/form/getdata/${formId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
