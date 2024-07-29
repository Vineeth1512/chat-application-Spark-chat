import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    profilePic: {
      type: String,
      required: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("Users", userSchema);
export default User;
