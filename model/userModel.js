const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require("bcryptjs");

const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your name"],
        maxLength: [30, "Name cant not exceed 30 characters"],
        minLength: [4, "Name should have more then 4 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid  Email"],
    },
    password: {
        type: String,
        required: [true, "please enter your password"],
        minLength: [8, "Password should be greater then  8 characters"],
        select: false
    },
    avatar: {

        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    role: {
        type: String,
        default: "user",
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

//  save hash password on backend 

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});



module.exports = mongoose.model("User", userSchema);