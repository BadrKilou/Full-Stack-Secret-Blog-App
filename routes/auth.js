const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../Models/auth/Auth');
const { check, validationResult } = require('express-validator');



// get all users
router.get('/', auth, async(req, res) => {
    try{
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
    }
    catch(err){
        console.log(err.message)
    }

})

router.post('/', [
   check('email', 'Email is not valid')
   .isEmail()
   .bail()
   .normalizeEmail(),
   
   check('password', 'Password should be at least 6 chars').exists()
   .isLength({ min: 5 })
], async (req, res) => {
   const errors = validationResult(req)
   if(!errors.isEmpty()){
       return res.status(400).json({ errors: errors.array() })
   } 
   const { email, password } = req.body;
   try{
       let user = await User.findOne({ email });
       if(!user){
           return res.status(400).json({ msg: 'Invalid Data' })
       }
       const isMatch = await bcrypt.compare(password, user.password);
       if(!isMatch){
           return res.status(401).json({ msg: 'Invalid Credentials' })
       }
  
       const payload = {
           user: {
               id: user.id
           }
       };
       jwt.sign(
           payload,
           config.get('keySecret'),
           {
               expiresIn: 36000000
           },
           (err, token) => {
               if(err) throw err;
               res.json({ token })
            
           }
       )

       

   }
   catch(err){
      console.log(err.message)
      return res.status(401).json({ msg: 'server error' })
   }
})

module.exports = router;