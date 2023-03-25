const contentController = require("../Models/content");
const result = require("../config/helper");

module.exports = {
  getAllContent: async (req, res) => {
    try {
      const content = await contentController.getAllContent();
      if (content) {
        result.response(res, 200, content);
      }
    } catch (err) {
      result.response(res, 500, { message: "Internal Server Error" });
    }
  },
};
