const contentRoute = require("express").Router();
const contentController = require("../Controllers/content");
const { authentication } = require("../config/helper");

contentRoute.get("/", authentication, contentController.getAllContent);

module.exports = contentRoute;
