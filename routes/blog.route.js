const express = require("express")
const { send } = require("process")
const { authenticate } = require("../middlewares/authenticate")
const { BlogModel } = require("../models/Blog.model")

// const {BlogModel} = require("../")

const blogsRoute = express.Router()

blogsRoute.get("/", async(req, res)=>{
    const all_Blogs = await BlogModel.find()
    res.send(all_Blogs)
})

blogsRoute.get("/:blogID", async(req, res)=>{
    const blogID = req.params.blogID;
    const Blog = await BlogModel.findById(blogID)

    res.send(Blog)
})

blogsRoute.use(authenticate)

blogsRoute.post("/create", async(req, res)=>{
    const blogData = req.body
    try {
        const new_Blog = await new BlogModel(blogData)
        new_Blog.save()
        res.json({"msg":"Note Publish Successfull"})
    } catch (err) {
        console.log(err)
        res.json({"msg":"Please Log in"})
    }
})

blogsRoute.patch("/update/:blogID", async(req, res)=>{
    const bID = req.params.blogID
    const authorID = req.body.authorID
    const newData = req.body
    try {
        const blog = await BlogModel.findOne({_id: bID})
        if (authorID == blog.authorID) {

            await BlogModel.findByIdAndUpdate({_id: bID}, newData)
            res.json({"msg":"Update Blog done!"})
        } else {
            res.json({"msg":"Not authorized"})
        }
        
    } catch (err) {
        console.log(err)
        res.json({"msg":"Update failure"})
    }

})

blogsRoute.delete("/delete/:blogID", async(req, res)=>{
    const bID = req.params.blogID
    const authorID = req.body.authorID
    console.log(authorID);
    try {
        const blog = await BlogModel.findOne({_id: bID})
        if (authorID == blog.authorID) {

            await BlogModel.findByIdAndDelete({_id: bID})
            res.json({"msg":"Delete Blog done!"})
        } else {
            res.send({"msg":"Not authorized"})
        }
        
    } catch (err) {
        console.log(err)
        res.send({"msg":"delete failure"})
    }
})

module.exports = {blogsRoute}