const jwt = require("jsonwebtoken");
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const REFRESH_TOKENS = [];
let counter = 0;

const refreshingAccessToken = (req, res) => {
  try {
    counter ++;
    console.log(counter)
    const { refreshToken } = req.body;
    if (!refreshToken) throw new Error("Bad request");
    console.log('----------------- REFRESH ----------------')
    console.log('here')
    console.log(REFRESH_TOKENS)
    console.log(refreshToken)
    console.log('----------------- REFRESH ----------------')
    if(REFRESH_TOKENS.includes(refreshToken)){
      console.log('already refreshed')
      return res.status(304).json({ message: 'Token already generated' });
    }
    console.log('not refreshed yet')
    REFRESH_TOKENS.push(refreshToken);
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, token) => {
      if (err) return res.sendStatus(403);
      // console.log(token);
      const accessToken = jwt.sign(token, ACCESS_TOKEN_SECRET, {
        expiresIn: "30s",
      });
      const refreshToken = jwt.sign(token, REFRESH_TOKEN_SECRET);
      res.status(202).json({ accessToken, refreshToken });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


module.exports = { refreshingAccessToken };
