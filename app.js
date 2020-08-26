const express = require("express");
const app = express();
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

//middlewares

app.use(morgan("dev"));

app.use(express.json());

app.use((req, res, next) => {
  req.requestedAt = new Date().toISOString();
  next();
});

app.use("/api/user", userRouter);
app.use("/api/tour", tourRouter);

module.exports = app;
