const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./src/Routes/auth");
const contentRoutes = require("./src/Routes/content");

const app = express();

//cors config
app.use(cors());

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/content", contentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`example app listening on port ${PORT}`));
