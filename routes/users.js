const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../Models/auth/Auth');
const { check, validationResult } = require('express-validator');



router.post('/',
[
   check('name', 'name is required')
   .not()
   .isEmpty(),
   check('email', 'Email is required')
   .normalizeEmail()
   .isEmail(),
   check('password', 'Please Enter a password with at least 5 chars')
   .isLength({ min: 6 })
],  async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, password } = req.body;

    try{
     let user = await User.findOne({ email })
     if(user){
         return res.status(400).json({ msg: 'user already exists' })
     }
     
     user = new User({
         name,
         email,
         password
     })
     const salt = await bcrypt.genSalt(10);
     user.password = await bcrypt.hash(password, salt)
    
     await user.save();
    //  res.json(user)
     const payload = {
         user: {
             id: user.id
         }
     }
   
     jwt.sign(payload, config.get('keySecret'), {
         expiresIn: 3600000
     }, (err, token) => {
         if(err) throw err;
         res.json({ token })
     })
     
    }
    catch(err){
     console.log(err.message)
     res.status(500).json({ msg: 'Server denied' })
    }
})


module.exports = router;