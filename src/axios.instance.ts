import axios, { AxiosInstance } from "axios";
import https from "https";
const BASE_URL = "https://api.example.com";

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default instance;
