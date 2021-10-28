const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.header("Authorization");

  if (token === "null")
    return res.status(400).json({
      message: "Access denied! You need to sign in.",
    });

  if (!token.startsWith("Bearer "))
    return res.status(500).json({
      message: "Access denied! You need to sign in.",
    });

  token = token.slice(7);

  if (token === "" || token == "null")
    return res.status(500).json({
      message: "Access denied! You need to sign in.",
    });

  console.log(token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY, {
      algorithms: ["HS512"],
    });
    req.user = decoded;
    next();
  } catch (ex) {
    console.log(ex);
    res.status(500).json({
      message: "Access denied!",
    });
  }
};
