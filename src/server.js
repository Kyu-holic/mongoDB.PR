const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { userRouter } = require("./routes/userRoute");

const MONGO_URI =
  "mongodb+srv://khhan1990:hankyu5134@mongodbpr.afibsec.mongodb.net/BlogServicePR?retryWrites=true&w=majority";

const server = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("mongoDB is connected");

    app.use(express.json());

    app.use("/user", userRouter);

    app.listen(5000, () => {
      console.log("Server is listening on port 5000");
    });
  } catch (err) {
    console.log({ err: err.message });
  }
};

server();
