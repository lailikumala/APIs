const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authModel = {
  signup: (body) => {
    return new Promise((resolve, reject) => {
      //to hash a pssword
      bcrypt.genSalt(10, (err, salt) => {
        const { password } = body;
        bcrypt.hash(password, salt, (err, hashedPassword) => {
          const newBody = { ...body, password: hashedPassword };
          if (err) {
            reject(err);
          }
          db.query("INSERT INTO user SET ?", newBody, (err, data) => {
            if (!err) {
              resolve(newBody);
            } else {
              reject(err);
            }
          });
        });
      });
    });
  },

  login: (body) => {
    return new Promise((resolve, reject) => {
      const { email, password } = body;
      db.query("SELECT * FROM user WHERE email=?", email, (err, data) => {
        let dataUser = data[0];
        if (!data.length) resolve("Failed to Login");
        else if (err) resolve("Failed to Login");
        else if (!err) {
          const token = jwt.sign(
            {
              user_id: dataUser?.user_id,
              email: dataUser?.email,
            },
            process.env.SECRET_KEY
          );
          bcrypt.compare(password, dataUser?.password, (err, result) => {
            if (result == true) {
              db.query(
                "SELECT * FROM user WHERE password=?",
                dataUser?.password,
                (err, data) => {
                  if (!err) {
                    resolve({
                      user_id: dataUser?.user_id,
                      email: dataUser?.email,
                      token,
                    });
                  } else reject();
                }
              );
            } else resolve("Failed to Login");
          });
        } else {
          resolve(err);
        }
      });
    });
  },
};

module.exports = authModel;
