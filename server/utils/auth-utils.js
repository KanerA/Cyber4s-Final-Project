const jwt = require("jsonwebtoken");
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  console.log("refresh: ", refreshToken);
  if (!refreshToken) return res.status(400).json({ error: "No refresh token" });
  try {
    // if (!REFRESH_TOKENS.includes(refreshToken))
    //   return res.status(404).json({ error: "Refresh token not found" });
    jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          console.log(err.message);
          return res.status(401).json({ error: "Not authorized" });
        }
        const data = { ...decoded };
        delete data.iat;
        const accessToken = jwt.sign(data, ACCESS_TOKEN_SECRET, {
          expiresIn: "10m",
        });
        res.json(accessToken);
      },
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { refreshToken };
