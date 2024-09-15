/** @format */

const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    name: {
      type: String,
      trim: true,
      required: [true, "User name is required"],
    },
    username: {
      type: String,
      trim: true,
      required: [true, "User username is required"],
      unique: [true, "Already exists"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "User email is required"],
      unique: [true, "Already exists"],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "User password is required"],
    },
    status: {
      type: String,
      enum: ["active", "inactive", "restricted"],
      default: "active",
    },
  },
  { timestamps: true }
);

UserSchema.index({ name: 1 });
UserSchema.index({ username: 1 });
UserSchema.index({ email: 1 });
UserSchema.index({ status: 1 });

module.exports = mongoose.model("User", UserSchema);
