import axios from "axios";
import { BASE_URL, Data, Form, Response } from "../config";
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
    return response;
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

export const getFormByUser = async () => {
  try {
    const response = await API.get(`/form/get`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const submitForm = async (data: Response) => {
  try {
    const response = await API.post("/form/submit", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getResponses = async (formId: string) => {
  try {
    const response = await API.get(`/response/${formId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
