const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please Enter your post title"],
        trim: true,
    },
    metaDescription: {
        type: String,
        required: [true, "Please Enter your post meta description"]
    },
    description: {
        type: String,
        required: [true, "Please Enter your post description"]
    },
    category: {
        type: String,
        required: [true, "Please Enter your post category"],
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],

    // reviews: [
    //     {
    //         user: {
    //             type: mongoose.Schema.ObjectId,
    //             ref: "User",
    //             required: true,
    //         },
    //         name: {
    //             type: String,
    //             required: true,
    //         },
    //         rating: {
    //             type: Number,
    //             required: true,
    //         },
    //         comment: {
    //             type: String,
    //             required: true
    //         },
    //     },
    // ],

    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User",
    },
    createAt: {
        type: Date,
        default: Date.now,
    }

});

module.exports = mongoose.model("Post", blogSchema);