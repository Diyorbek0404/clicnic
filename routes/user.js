const express = require("express")
const router = express.Router();
const Post = require("../models/Post")
const User = require("../models/User")
const bcrypt = require("bcrypt")

// update user
router.get("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt()
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try {
            const updateUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: true
                },
                {
                    new: true
                }
            );
            res.status(200).json(updateUser)
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(401).json("malumotlaringiz yangilanmadi")
    }
})

// get user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc;
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router