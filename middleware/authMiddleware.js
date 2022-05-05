const jwt= require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const protected = asyncHandler(async (req, res, next) => {
 let token

 if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
     try{
        //  get token from header
        token =req.headers.authorization.split(' ')[1]

        // verify token

        const decoded = jwt.verify(token, process.env.JWT_SECRETS)

        // Get user from the token
        req.user = await User.findById(decoded.id).select('-password')

        next()
     } catch(error){
        console.log(error)
        res.status(401)
        throw new Error('Not authorised')
     }
 }
 if(!token){
     res.status(402)
     throw new Error( 'Not authorised, No token')
 }
})

module.exports = { protected }