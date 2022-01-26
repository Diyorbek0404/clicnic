const express = require("express");
const mongoose = require("mongoose")
const path = require("path")
const postRouter = require("./routes/post")
const authRouter = require("./routes/auth")
const userRouter = require("./routes/user")
const multer = require("multer")
const app = express();
const cors = require("cors");
app.use(cors())
app.use(express.json())

app.use("/images", express.static(path.join(__dirname, "/images")))

mongoose.connect("mongodb+srv://kuldashev:mO5JzQd3x8annG8z@cluster0.r6vwn.mongodb.net/klinika?retryWrites=true&w=majority").then(console.log("connected to mongoDB"))
.catch(error => {
    console.log(error)
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename : (req, file, cb) => {
        cb(null, req.body.name);
    }
})

const upload = multer({storage: storage})


app.use("/api/post/", postRouter)
app.use("/api/user/", userRouter)
app.use("/api/auth/", authRouter)


app.listen("5000", () => {
    console.log("Backend ishga tushdi")
})