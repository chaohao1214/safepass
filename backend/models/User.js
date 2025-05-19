const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    validate: {
      validator: function (value) {
        return this.googleId || (value && value.length >= 6);
      },
      message: "Password is required and must be at least 6 characters long",
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
