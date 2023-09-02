import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./Db.js";
import register from "./middleware/register.js";
import login from "./middleware/login.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import UserModel from "./models/User.js";
import PostModel from "./models/Post.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({ dest: "uploads/" });

const app = express();
dotenv.config();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

dbConnect();

app.post("/register", register, (req, res) => {
    res.status(201).json({ message: "User created" });
});

app.post("/login", login);

app.get("/profile", async (req, res) => {
    const { token } = req.cookies;
    try {
        let UserId = jwt.verify(token, process.env.JWT_SECRET_KEY);
        let User = await UserModel.findOne({ _id: UserId.id });
        res.json({ name: User.name, id: User._id });
    } catch (err) {
        res.json("null");
    }
});

app.post("/post", upload.single("file"), async function (req, res, next) {
    const { originalname, path } = req.file;
    const ext = originalname.split(".")[1];
    let newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    try {
        let UserId = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const postDoc = await PostModel.create({
            title: req.body.title,
            content: req.body.content,
            summary: req.body.summary,
            cover: newPath,
            author: UserId.id,
        });
        res.json(postDoc);
    } catch (err) {
        res.json(err);
    }
});

app.put("/post", upload.single("file"), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const ext = originalname.split(".")[1];
        newPath = path + "." + ext;
        fs.renameSync(path, newPath);
    }
    let postDoc = await PostModel.findById(req.body.id);
    await postDoc.update({
        title: req.body.title,
        content: req.body.content,
        summary: req.body.summary,
        cover: newPath ? newPath : postDoc.cover,
    });
});

app.get("/post", (req, res) => {
    PostModel.find()
        .populate("author", ["name"])
        .sort({ createdAt: -1 })
        .limit(20)
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
});

app.get("/post/:id", (req, res) => {
    const { id } = req.params;
    PostModel.findById(id)
        .populate("author", ["name"])
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
});

app.post("/logout", (res, req) => {
    req.cookie("token", " ").json("ok");
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`);
});
