import axios from "axios";

// Permite comunicação com o backend, enviarmos cookies e requests

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true,
});
