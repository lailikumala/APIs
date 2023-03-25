const jwt = require("jsonwebtoken");

module.exports = {
  authentication: (req, res, next) => {
    const bearearToken = req.header("auth");
    if (!bearearToken)
      res.status(401).send({
        status: 401,
        message: "UNAUTHORIZED",
      });
    else {
      jwt.verify(bearearToken, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          res.status(401).send({
            status: 401,
            error: "UNAUTHORIZED",
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }
  },

  response: (res, status, data) => {
    const result = {};
    result.status = status;
    result.data = data;
    return res.status(result.status).send(result);
  },
};
