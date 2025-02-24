import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "../middlewares/asyncHandler.js";

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, password, email } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("Email already exist");
  }

  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: encryptedPassword,
  });
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Email already exist");
  }
});

const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    let token = jwt.sign({ userId: user._id },process.env.JWT_SECRET_KEY, {
      //token creation
      expiresIn: "1d",
    });
    res.cookie("jwt", token, {
      httpOnly: true, // after login,jwt is stored in the frintend cookies as htttponly cookie,  automatically
      secure: false, //sslc certificate false
      sameSite: "strict", //csrf attack prevent
      maxage: 60 * 60 * 1000, // i day in mlsecondes
    });
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expiresIn: new Date(0),
  });
  res.status(200).json({ message: "Logout succussFully" });
};

export { registerUser, authUser, logoutUser };
