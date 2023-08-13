const jwt = require("jsonwebtoken");
const key = "Secret-Key";
const auth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    console.log("No Token Found");
    return res.status(401).json({ error: "Unauthorized. Missing token." });
  }
  try {
    const decodedToken = jwt.verify(token, key);
    req.userId = decodedToken.id;
    req.type = decodedToken.type;
    //return req.type;
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ error: "Forbidden. Invalid token." });
  }
};

module.exports = auth;
