import User from "../../models/UserModel/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "./jwt.js";
var salt = bcrypt.genSaltSync(10);

export const userSignin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedpass = bcrypt.hashSync(password, salt);
    const isUserPresent = await User.findOne({ email });
    if (isUserPresent) {
      return res.status(409).json({
        message: "Username or Email is already present",
      });
    }
    const saveUser = new User({
      username,
      email,
      password: hashedpass,
    });
    const userData = await saveUser.save();
    const payload = {
      id: userData.id,
      username: userData.username,
    };
    const token = generateToken(payload);
    return res
      .status(201)
      .json({ message: "User created successfully", token });
  } catch (error) {
    return res.status(500).json({ message: "User creation failed" });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = generateToken(payload);


    return res.status(200).json({ message: "Login successful" ,token});
  } catch (error) {
    return res.status(500).json({ message: "Login failed" });
  }
};
