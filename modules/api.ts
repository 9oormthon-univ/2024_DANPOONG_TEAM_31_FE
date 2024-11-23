import { useAuthStore } from "@/stores/authStore";
import axios, { AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: "http://15.164.29.113:8080/api",
});

const { accessToken, refreshToken } = useAuthStore.getState();

api.interceptors.request.use(async (config) => {
  const ignored = ["/auth/kakao/login"];

  if (ignored.some((i) => i === config.url)) {
    // 토큰 제외
    return config;
  } else {
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
  }

  return config;
});
