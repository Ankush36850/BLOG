import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

async function login(req, res,) {
  const { email, password } = req.body;
  let User = await UserModel.findOne({ email });
  if (User) {
    let passwordMatch = await bcrypt.compare(password, User.password);
    if (passwordMatch) {
        const token = jwt.sign({id : User._id},process.env.JWT_SECRET_KEY, {expiresIn : "2h"});
        res.status(200).cookie("token",token).json({
          id:User._id,
          name:User.name
        });
    } else {
        res.status(401).json({ message: "Invalid Password" });
    }
  } else {
    res.status(401).json({ message: "User not found" });
  }
}

export default login;
