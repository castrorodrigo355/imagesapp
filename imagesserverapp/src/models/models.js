const {Schema, mongoose} = require("../database/database");
// var postSchema = new Schema({
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     path: { type: String, required: true },
//     originalname: { type: String, required: true },
//     mimetype: { type: String, required: true },
//     size: { type: Number, required: true },
//     date: { type: Date, default: Date.now() }
// })

var postSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    public_id: { type: String, required: true }
})

var Post = mongoose.model("Post", postSchema)

module.exports = Post