import axios from "axios";
import { readCookie, createCookie, eraseCookie } from "./cookies";

// const getHttp = (url, tokenName) => {
//   return axios.get(url, {
//     headers: {
//       authorization: "Bearer " + readCookie(tokenName),
//     },
//   });
// };

const intercept = () => {
  axios.interceptors.response.use(
    (response) => response,
    (err) => {
      console.log("fuck boys");
      const refreshToken = readCookie("refreshToken");
      if (err.message.slice(-3) === "401" && refreshToken) {
        const accessToken = readCookie("accessToken");
        if (!accessToken)
          return axios
            .post("/auth/refresh", {
              refreshToken: refreshToken,
            })
            .then((res) => {
              createCookie("accessToken", res.data.accessToken, 10000);
              err.config.headers["authorization"] =
                "Bearer " + res.data.accessToken;
              return axios.request(err.config);
            })
            .catch((err) => {
              console.log(err);
              eraseCookie("refreshToken");
            });
      }
      return Promise.reject(err);
    },
  );
};

export { intercept };
