const jwt = require("jsonwebtoken");
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const validateRefreshToken = (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw new Error("Bad request");
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, token) => {
      if (err){
        console.log(refreshToken)
        console.log(err.message);
        return res.status(500).json({ expired: true });
      }
      console.log(token);
      const accessToken = jwt.sign(token, ACCESS_TOKEN_SECRET, {
        expiresIn: "5m",
      });
      res.status(202).json({ accessToken });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { validateRefreshToken };
