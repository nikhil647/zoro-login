import mongoose from "mongoose";
const bcrypt = require("bcrypt");

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

schema.pre("save", async function (next) {
  
  if (!this.isModified("password")) {
    return next(); // If password is not modified, proceed to save
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next(); // Call next to proceed with the save operation
  } catch (error) {
    console.log(error)
    next(); // Pass error to next middleware
  }
});

module.exports = mongoose.models.User || mongoose.model("User", schema);
