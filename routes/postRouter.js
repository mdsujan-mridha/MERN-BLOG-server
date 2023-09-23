const express = require("express");
const { createPost, getAllPost, getPostDetails, updatePost, deletePost } = require("../controller.js/postControler");


const router = express.Router();



router.route("/post/new").post(createPost);
router.route("/posts").get(getAllPost);
router.route("/post/:id").get(getPostDetails);

// update post by admin 
router.route("/admin/post/:id").put(updatePost).delete(deletePost);

module.exports = router