import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const getToken = () => {
  return localStorage.getItem("token", token);
};

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const axiosPost = async ({
  url,
  data = {},
  headers = {},
  onError = () => {},
  onSuccess = () => {},
  ...rest
}) => {
  try {
    const response = await axiosInstance.post(url, data, {
      headers,
      ...rest,
    });
    onSuccess(response);
    return response;
  } catch (error) {
    onError(error);
    return Promise.reject(error);
  }
};

export const axiosGet = async ({
  url,
  headers = {},
  onError = () => {},
  onSuccess = () => {},
  ...rest
}) => {
  try {
    const res = await axiosInstance.get(url, {
      headers,
      ...rest,
    });
    onSuccess(res);
    return res;
  } catch (error) {
    onError(error);
    return Promise.reject(error);
  }
};

export const axiosPut = ({ url, data, headers = {}, ...rest }) => {
  return axiosInstance.put(url, data, {
    headers,
    ...rest,
  });
};

export const axiosDelete = ({ url, headers = {}, ...rest }) => {
  return axiosInstance.delete(url, {
    headers,
    ...rest,
  });
};
