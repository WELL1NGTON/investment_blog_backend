import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import routes from "./routes";
const nodemailer = require("nodemailer");
// const rateLimiterMiddleware = require("./middleware/rateLimiter");

//environment variables
// require("dotenv").config();
import "dotenv/config";

//express server
const app = express();
const port = process.env.port || 5000;

//middleware
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", //frontend
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static("public")); //folder public so user can receive the images
// app.use(rateLimiterMiddleware);

// const uri = process.env.ATLAS_URI;
const uri = process.env.MONGO_URI;
if (uri) {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
  });

  // app.use("/articles", require("./routes/articles"));
  // app.use("/users", require("./routes/users"));
  // app.use("/auth", require("./routes/auth"));
  // app.use("/images", require("./routes/images"));
  // app.use("/categories", require("./routes/categories"));
  // app.use("/reset", require("./routes/reset"));

  app.use(routes);

  //start listening
  app.listen(port, () => {
    console.log(`server is running on port:  ${port}`);
  });
}