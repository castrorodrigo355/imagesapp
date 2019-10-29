const express = require("express");
const Post = require("../models/models");
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary");
const uuid = require("uuid/v4");
const fsx = require("fs-extra");
const { unlink } = require("fs-extra");
const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

// Multer ...
const storage = multer.diskStorage({
    destination: path.join(__dirname, "../public/uploads"),
    filename: (req, file, callback) => {
        // callback(null, file.originalname)
        callback(null, uuid() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage,
    dest: path.join(__dirname, "../public/uploads"),
    // limits: {fileSize: 2000000},
    // fileFilter: (req, file, cb) => {
    //     const fileTypes = /jpeg|jpg|gif|png/;
    //     const mimetype = fileTypes.test(file.mimetype);
    //     const extname = fileTypes.test(path.extname.originalname);
    //     if(mimetype && extname){
    //         return cb(null, true)
    //     }
    //     cb("Error: El archivo no es una imagen")
    // }
}).single("image")

router.get("/", async (req, res) => {
    const posts = await Post.find();
    res.json(posts)
})

router.post("/upload", upload, async (req, res) => {
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    // cloudinary.v2.uploader.upload(req.file.path)
    //     .then(result => console.log(result))
    //     .catch(err => console.log(err))
    // const { originalname, mimetype, size } = req.file;
    const { title, description } = req.body;
    // const path = "/uploads/" + req.file.filename;
    const post = new Post({title, description, 
                    url: result.url, public_id: result.public_id})
    await post.save();
    await fsx.unlink(req.file.path);
    
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => console.log(err))
})

router.get("/image/:id", (req, res) => {
    Post.findById(req.params.id, (err, post) => {
        if(err) console.log(err)
        res.json(post)
    })
})

router.delete("/image/:id", async (req, res) => {
    const post = await Post.findByIdAndDelete(req.params.id);
    await cloudinary.v2.uploader.destroy(post.public_id);
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => console.log(err))
})    

router.get("/", async (req, res) => {
    const posts = await Post.find();
    res.json(posts)
})

module.exports = router