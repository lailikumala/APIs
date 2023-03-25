const authRoutes = require("express").Router();
const authController = require("../Controllers/auth");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min
  max: 3, // limit each IP to 3 request
  message: "Please try again after 10 min",
});

authRoutes.post("/signup", authController.signup);
authRoutes.post("/login", limiter, authController.login);

module.exports = authRoutes;
