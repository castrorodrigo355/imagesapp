const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost/dbimagesapp", 
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        }
    )
    .then(db => console.log("DB is conected"))
    .catch(err => console.error(err))

module.exports = {Schema, mongoose}