const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../Models/auth/Auth');
const { check, validationResult } = require('express-validator');
const Blog = require('../Models/Blog');



router.get('/', auth, async (req, res) => {
    try{
    const blogs = await Blog.find({ user: req.user.id }).sort({ data: -1 }); // Recent blogs first
    res.json(blogs)
    }
    catch(err){
    console.log(err.message)
    res.status(400).json({ msg: 'server error' })
    }
})


router.post('/', auth, [
   check('title', 'Title is required').not().isEmpty(),
   check('blog', 'blog is required').not().isEmpty().isLength({ min: 5 })
],  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    const { title, author, blog, type } = req.body;

    try{
    const newBlog = new Blog({
        title,
        author,
        blog,
        type,
        user: req.user.id
    });
    const getBlog = await newBlog.save();
    res.json(getBlog)


    }
    catch(err){
    console.log(err.message)
    return res.status(400).json({ msg: 'Server error try later'  })
    }

})


router.put('/:id', auth, async(req, res) => {
    const { title, author, blog, type } = req.body;

    // Build a blog object
    const blogField = {};
    if(title) blogField.title = title;
    if(author) blogField.author = author;
    if(blog) blogField.blog = blog;
    if(type) blogField.type = type;

    try{
    let blogs = await Blog.findById(req.params.id);
    if(!blogs){
        return res.status(404).json({ msg: 'Blog Cannot be found' })
    }
    //  // Make sure user owns a blog
    //  if(blogs.user.toString() !== req.user.id){
    //     return res.status(401).json({ msg: 'Unauthorized !' })
    // }
    
    const blog = await Blog.findByIdAndUpdate(req.params.id,
    { $set: blogField },
    { new: true }
     );
     res.json(blog)
}
    catch(err){
        console.log(err.message)
        res.status(500).send('Something Went Wrong')
    }

})

router.delete('/:id', auth, async(req, res) => {
    
    try{
        let blogs = await Blog.findById(req.params.id);
        if(!blogs){
            return res.status(404).json({ msg: 'Blog Cannot be found' })
        }
        //  // Make sure user owns a blog
        //  if(blogs.user.toString() !== req.user.id){
        //     return res.status(401).json({ msg: 'Unauthorized !' })
        // }
        
        await Blog.findByIdAndDelete(req.params.id);
         res.json({ msg: 'blog removed' })
    }
        catch(err){
            console.log(err.message)
            res.status(500).send('Something Went Wrong')
        }
    
    })
    
module.exports = router;


