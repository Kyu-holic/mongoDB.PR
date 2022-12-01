const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      first: {
        type: String,
        required: true,
      },
      last: {
        type: String,
        required: true,
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", UserSchema);
module.exports = { User };
