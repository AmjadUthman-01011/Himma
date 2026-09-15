const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const router = require("./routes");
const errorHandler = require("../src/middlewares/errorhandle.middleware")
const app = express();

const cookieParser = require("cookie-parser");

app.use(cookieParser());
// Security
app.use(helmet());

// CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Request logging
if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}

// Parse JSON
app.use(express.json());

// Parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// API router Index
app.use("/api", router);

// not found middleware
//app.use(notFound);

// error middleware
app.use(errorHandler);

module.exports = app;