const jwt = require("jsonwebtoken");
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const REFRESH_TOKENS = [];
let counter = 0;

const refreshingAccessToken = (req, res) => {
  try {
    counter++;
    console.log(counter);
    const { refreshToken } = req.body;
    if (!refreshToken) throw new Error("Bad request");
    console.log("----------------- REFRESH ----------------");
    console.log("here");
    console.log(REFRESH_TOKENS);
    console.log(refreshToken);
    console.log("----------------- REFRESH ----------------");
    if (REFRESH_TOKENS.includes(refreshToken)) {
      console.log("already refreshed");
      return res.status(304).json({ message: "Token already generated" });
    }
    console.log("not refreshed yet");
    REFRESH_TOKENS.push(refreshToken);
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, token) => {
      if (err) return res.sendStatus(403);
      // console.log(token);
      const { name, user_name, password } = token;
      const payload = {
        name: name,
        password: password,
        user_name: user_name,
      };
      // console.log("agdgag;", token);
      const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: "30s",
      });
      console.log("access: ", accessToken);
      const refreshTokenNew = jwt.sign(payload, REFRESH_TOKEN_SECRET);
      res.status(200).json({ accessToken, refreshTokenNew });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  console.log("refresh: ", refreshToken);
  if (!refreshToken) return res.status(400).json({ error: "No refresh token" });
  try {
    // if (!REFRESH_TOKENS.includes(refreshToken))
    //   return res.status(404).json({ error: "Refresh token not found" });
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          console.log(err.message);
          return res.status(401).json({ error: "Not authorized" });
        }
        const data = { ...decoded };
        delete data.iat;
        const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
        res.send(accessToken);
      },
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { refreshingAccessToken, refreshToken };
