const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const path = require("path");
const app =  express();

app.use(morgan("dev"));
app.set("port", 3000);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.use(require("./routes/routes"))

app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
})