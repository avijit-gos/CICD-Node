/** @format */

const mongoose = require("mongoose");
const createError = require("http-errors");
const User = require("../model/userModel");
const { createHashPassowrd, createAuthToken } = require("../helpers/helpers");

class UserController {
  /* Register a new user */
  async registerUser(req, res, next) {
    try {
      if (
        !req.body.name ||
        !req.body.username ||
        !req.body.email ||
        !req.body.password
      ) {
        throw createError.BadRequest({
          message: "Invalid user input for registration",
        });
      }
      const user = await User.findOne({
        $or: [{ email: req.body.email }, { username: req.body.username }],
      }).select("-password");
      if (user && user.email === req.body.email) {
        throw createError.BadRequest({ message: "Email already exists" });
      } else if (user && user.username === req.body.username) {
        throw createError.BadRequest({
          message: "Username already being taken",
        });
      }

      /* Hash user password */
      const hash = await createHashPassowrd(req.body.password);
      const newUserObj = User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });
      const newUser = await newUserObj.save();

      /* Create JWT token */
      const token = await createAuthToken(newUser);
      return res.status(201).json({
        message: "User successfully registered",
        status: 201,
        user: newUser,
        token,
      });
    } catch (error) {
      next(error);
    }
  }

  /* LogIn existing user */
  async loginUser(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  /* Get lists of users profile */
  async fetchUsersList(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  /* Get specific user profile */
  async fetchUserProfile(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  /* Update user profile */
  async updateUserProfile(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  /* Update status of user profile */
  async updateProfileStatus(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
