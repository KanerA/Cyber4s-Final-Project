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
    async (err) => {
      const refreshToken = readCookie("refreshToken");
      console.log(refreshToken);
      if(err.message.slice(-3) === '304') return console.log(err.data);
      if (err.message.slice(-3) === "401" && refreshToken) {
        const accessToken = readCookie("accessToken");
        if (!accessToken)
        console.log('intercept')
        const res = await axios
          .post("/auth/refresh", {
            refreshToken,
          })
        console.log('wait')
        console.log('------------ NEW ACCESS TOKEN -----------------')
        console.log(res);
        createCookie("accessToken", res.data.accessToken, 10000);
        createCookie("refreshToken", res.data.refreshToken, 10000);
        console.log(res.data.refreshToken)
        err.config.headers["authorization"] =
          "Bearer " + res.data.accessToken;
        return axios.request(err.config);
      }
      return Promise.reject(err);
    },
  );
};

export { intercept };
