import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import genetateTokenSetCookie from "../utils/generateToken.js";
export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password doesn't match..!",
      });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({
        message: "Username already exists..!",
      });
    }
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      username,
      password: hashPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    if (newUser) {
      genetateTokenSetCookie(newUser._id, res);
      await newUser.save();
      return res.status(201).json({
        message: "User Registerd Successfully..!",
        user: newUser,
      });
    } else {
      return res.status(400).json({
        message: "Invalid User Data..!",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error..!",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPassword = await bcrypt.compare(password, user.password);

    if (!user || !isPassword) {
      return res.status(400).json({
        message: "Invalid username or password",
      });
    }
    genetateTokenSetCookie(user._id, res);
    return res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully..!" });
  } catch (err) {
    console.log(`Error in logout controller ${err.message}`);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
