const db = require("../config/db");

const contentModel = {
  getAllContent: () => {
    return new Promise((reslove, reject) => {
      db.query("SELECT * FROM content", (err, res) => {
        if (!err) {
          reslove(res);
        }
        reject(err);
      });
    });
  },
};

module.exports = contentModel;
