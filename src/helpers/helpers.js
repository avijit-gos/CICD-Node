/** @format */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

class Helper {
  constructor() {}

  async createHashPassowrd(password) {
    try {
      const hash = await bcrypt.hash(password, 10);
      return hash;
    } catch (error) {
      throw createError.BadRequest({
        message: "Something went wrong while encrypt user password",
      });
    }
  }

  async createAuthToken(user) {
    try {
      const token = await jwt.sign(
        { _id: user._id, username: user.username },
        process.env.SECRET_KEY,
        { expiresIn: "1d" }
      );
      return token;
    } catch (error) {
      throw createError.BadRequest({
        message: "Error while generating authentication token",
      });
    }
  }
}

module.exports = new Helper();
