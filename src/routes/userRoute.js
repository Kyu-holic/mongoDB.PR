const { Router } = require("express");
const userRouter = Router();
const mongoose = require("mongoose");
const { User } = require("../models/User");

userRouter.get("/", async (req, res) => {
  try {
    const users = await User.find();
    return res.send({ users });
  } catch (err) {
    console.log({ err: err.message });
  }
});

userRouter.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId))
      return res.status(400).send({ err: "Invalid user" });
    const user = await User.findOne({ _id: userId });
    return res.send({ user });
  } catch (err) {
    console.log({ err: err.message });
  }
});

userRouter.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId))
      return res.status(400).send({ err: "Invalid userId" });
    const user = await User.findOneAndDelete({ _id: userId });
    return res.send({ user });
  } catch (err) {
    console.log({ err: err.message });
  }
});

userRouter.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId)
      return res.status(400).send({ err: "Invalid userId" });
    const { age, name } = req.body;
    if (!name && !age)
      return res.status(400).send({ err: "name or age must be required" });
    if (name && typeof name.first !== "string" && typeof name.last !== "string")
      return res.status(400).send({ err: "name has to be string" });
    if (age && typeof age !== "number")
      return res.status(400).send({ err: "age must be number" });
    // const user = await User.findByIdAndUpdate(
    //   { _id: userId },
    //   { age, name },
    //   { new: true }
    // );
    const user = await User.findById(userId);
    if (age) user.age = age;
    if (name) user.name = name;
    await user.save();
    return res.send({ user });
  } catch (err) {
    console.log({ err: err.message });
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const { username, name } = req.body;

    if (!username)
      return res.status(400).send({ err: "username must be required" });
    if (!name) return res.status(400).send({ err: "name must be required" });
    if (!name.first || !name.last)
      return res
        .status(400)
        .send({ err: "Both first and last name have to be required" });

    const user = new User(req.body);
    await user.save();

    return res.send({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: err.message });
  }
});

module.exports = {
  userRouter,
};
