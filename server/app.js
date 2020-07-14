require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { urlencoded, json } = require("express");
const router = require("./routers");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(router);
app.use(errorHandler);

module.exports = app;
