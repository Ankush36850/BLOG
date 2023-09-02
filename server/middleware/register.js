import UserModel from "../models/User.js";
import bcrypt from "bcrypt";

const saltround = 10;
async function register(req, res, next) {
    try {
        let {name, email, password } = req.body;
        let User = await UserModel.findOne({ email });
        if (User) {
        return res.status(409).json({ message: "E-mail already registered." });
        }
        let encryptedPass = await bcrypt.hash(password, saltround);
        let user = new UserModel({
        name,
        email,
        password: encryptedPass,
        });
        await user.save();
        next();
        
    } catch (err) {
    console.log(err);
    }
}

export default register;
