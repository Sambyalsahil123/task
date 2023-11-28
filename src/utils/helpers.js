// utils/api.js
import axios from "axios";

const apiConfig = {
  headers: { "app-id": "6564b5be15e99df200e32b6e" },
};

const API_BASE_URL = "https://dummyapi.io/data/v1/user";

export const fetchUsers = () => {
  return axios
    .get(`${API_BASE_URL}?limit=10`, apiConfig)
    .then((response) => response.data.data)
    .catch((error) => {
      console.error("Error fetching users:", error);
      throw error;
    });
};

export const addUser = (user) => {
  return axios
    .post(`${API_BASE_URL}/create`, user, apiConfig)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error adding user:", error);
      throw error;
    });
};

export const deleteUser = (userId) => {
  return axios.delete(`${API_BASE_URL}/${userId}`, apiConfig).catch((error) => {
    console.error("Error deleting user:", error);
    throw error;
  });
};

export const updateUser = (userId, userInfo) => {
  return axios
    .put(`${API_BASE_URL}/${userId}`, userInfo, apiConfig)
    .catch((error) => {
      console.error("Error updating user:", error);
      throw error;
    });
};
