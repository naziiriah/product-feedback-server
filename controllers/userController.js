const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const user = require('../model/userModel')


// @ desc   Authenticate new user
// @route  Post /api/users/
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password ){
        res.status(400)
        throw new Error('Please register all fields')
    }

    // checkif user exists

    const userExists = await user.findOne({email})

    if (userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    // hash passsword
    const salt = await bcrypt.genSalt(10)
    const hashedPasword = await bcrypt.hash(password, salt)

    const newUser = user.create({
        name,
        email,
        password: hashedPasword,
        
    })

    if(newUser){
        res.status(201).json({
            _id:newUser.id,
            name:newUser.name,
            email: newUser.email,
            token: generateToken(newUser.id)
        })
    } else{
        res.status(400)
        throw new Error('Invalid user data')
    }
    res.json({ message : "Register User"})
})

// @ desc   Authenticate user
// @route  Post /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password} = req.body

    if( !email || !password ){
        res.status(400)
        throw new Error('Please input all fields')
    }
      // checkif user exists
      const userExists = await user.findOne({email})

      if(userExists && (await bcrypt.compare(password, userExists.password))){
        res.json({
            _id: userExists.id,
            name: userExists.name,
            email: userExists.email,
            token: generateToken(newUser.id)
        })
      } else {
           res.status(401)
           throw new Error ('invalid user infomartioins ')
      }
  

    res.status(200).json({ message: 'Login uSer'})
})

// @ desc   Get user data
// @route   Get /api/users/me
// @access  Private
const getUser = asyncHandler(async (req, res) => {
    const {_id, name, email} = await user.findById(req.user.id)


    res.status(200).json({ 
        id:_id,
        name,
        email 
    })
})


//  GENERATE TOKEN
const generateToken = (id) => {
    return jwt.sign({ id}, process.env.JWTSECRETS, {
        expiresIn: '30d',
    } )
}

module.exports = {
    registerUser,
    loginUser,
    getUser
}