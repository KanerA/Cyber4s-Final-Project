import axios from "axios";
import { readCookie, createCookie, eraseCookie } from "./cookies";

// const getHttp = (url, tokenName) => {
//   return axios.get(url, {
//     headers: {
//       authorization: "Bearer " + readCookie(tokenName),
//     },
//   });
// };

// const intercept = () => {
//   axios.interceptors.response.use(
//     (response) => response,
//     async (err) => {
//       const refreshToken = readCookie("refreshToken");
//       console.log(refreshToken);
//       //   if (err.message.slice(-3) === "304") return console.log(err.data);
//       if (err.message.slice(-3) === "403" && refreshToken) {
//         const accessToken = readCookie("accessToken");
//         // if (!accessToken)
//         console.log("intercept");
//         try {
//           const res = await axios.post("/auth/refresh", {
//             refreshToken,
//           });
//           console.log("wait");
//           console.log("------------ NEW ACCESS TOKEN -----------------");
//           console.log(res);
//           console.log(accessToken === res.data.accessToken);
//           createCookie("accessToken", res.data.accessToken, 10000);
//           createCookie("refreshToken", res.data.refreshTokenNew, 10000);
//           console.log(res.data.refreshTokenNew);
//           err.config.headers["Authorization"] =
//             "Bearer " + res.data.accessToken;
//           return axios.request(err.config);
//         } catch (error) {
//           throw error;
//         }
//       } else {
//         throw err;
//       }
//       return Promise.reject(err);
//     },
//   );
// };

// export { intercept, getHttp };

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
