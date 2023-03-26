const authModel = require("../Models/auth");
const results = require("../config/helper");

module.exports = {
  signup: async (req, res) => {
    try {
      const signup = await authModel.signup(req.body);
      if (signup) {
        results.response(res, 200, { message: "Sign Up Successful" });
      }
    } catch (e) {
      results.response(res, 500, { message: "Internal Server Error" });
    }
  },

  login: async (req, res) => {
    try {
      const login = await authModel.login(req.body);
      if (login == "Failed to Login")
        results.response(res, 400, { message: login });
      else
        results.response(res, 200, {
          message: "Login Successful",
          data: login,
        });
    } catch (err) {}
  },
};
