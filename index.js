/** @format */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const createError = require("http-errors");
const rateLimit = require("express-rate-limit");
const xssClean = require("xss-clean");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});
require("./src/database/database");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(helmet());
// app.use(limiter);
app.use(xssClean());

app.use("/api/v1/user", require("./src/routes/userRoutes"));

app.use(async (req, res, next) => {
  next(createError.NotFound({ message: "Page not found" }));
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const port = process.env.PORT || 5050;

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = server;
