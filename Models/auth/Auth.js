const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function(req, res, next){
    // Get token from Header
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(405).json({ msg: 'No token ! Access Denied' })
    }
    try{
    const decoded = jwt.verify(token, config.get('keySecret'));
    req.user = decoded.user;
    next()
    }
    catch(err){
    res.status(401).json({ msg: 'Token is not valid !' })
    }
}