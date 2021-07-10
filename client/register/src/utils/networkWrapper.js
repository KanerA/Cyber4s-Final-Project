import axios from "axios";
import { readCookie, createCookie, eraseCookie } from "./cookies";

const network = axios.create();

const getAccessToken = () => readCookie("accessToken");

network.interceptors.request.use((config) => {
  config.headers.authorization = `bearer ${getAccessToken()}`;
  return config;
});

network.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response ? error.response.status : null;
    const originalRequest = error.config;
    console.log(readCookie("refreshToken"));
    if (status === 403) {
      try {
        const res = await network.post("auth/refresh", {
          refreshToken: readCookie("refreshToken"),
        });
        console.log("access: ", res.data);
        console.log("refresh: ", res.data.refreshTokenNew);

        createCookie("accessToken", res.data, 10000);
        const data = await network(originalRequest);
        return data;
      } catch (err) {
        throw err;
      }
    } else {
      throw error;
    }
  },
);

export { network };
