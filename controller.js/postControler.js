
const catchAsyncError = require("../middleware/catchAsyncError");
const Post = require("../model/blogModel");
const ErrorHandler = require("../utils/ErrorHandler");
const ApiFeatures = require("../utils/apiFeatures");

exports.createPost = catchAsyncError(async (req, res, next) => {

    // add cloudinary 
    const post = await Post.create(req.body);

    res.status(201).json({
        success: true,
        post,
    })
});

exports.getAllPost = catchAsyncError(async (req, res, next) => {

    const resultPerPage = 4;
    const postCount = await Post.countDocuments();

    const apiFeature = new ApiFeatures(Post.find(), req.query)
        .search()
        .filter();

    let posts = await apiFeature.query;
    let filteredPostCount = posts.length;
    apiFeature.pagination(resultPerPage);

    posts = await apiFeature.query.clone();

    res.status(200).json({
        success: true,
        posts,
        resultPerPage,
        filteredPostCount,
        postCount,
    })

});

// post details 
exports.getPostDetails = catchAsyncError(async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    // console.log(await Post.findById(req.params.id));
    if (!post) {
        return next(new ErrorHandler("Post not found", 404))
    }
    res.status(200).json({
        success: true,
        post,
    })
});
// update post 
exports.updatePost = catchAsyncError(async (req, res, next) => {
    let post = await Post.findById(req.params.id);
    // console.log(await Post.findById(req.params.id))
    if (!post) {
        return next(new ErrorHandler("Post Not found", 404))
    }

    post = await Post.findByIdAndUpdate(req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
    res.status(200).json({
        success: true,
        post,
    })
});
// delete post
exports.deletePost = catchAsyncError(async (req, res, next) => {

    const post = await Post.findById(req.params.id);
    if (!post) {
        return next(new ErrorHandler("Post not found", 404))
    }
    await post.deleteOne();
    res.status(200).json({
        success: true,
        message: "Post deleted Successfully"
    });
})