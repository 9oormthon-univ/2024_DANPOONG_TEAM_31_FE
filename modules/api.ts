import axios from "axios";

export const api = axios.create({
  baseURL: "http://15.164.29.113:8080/api",
});
