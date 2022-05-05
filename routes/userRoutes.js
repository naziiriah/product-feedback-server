const express = require('express')
const router = express.Router()
const  { registerUser, getUser,loginUser} = require('../controllers/userController')
const { protected } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.get('/me',protected, getUser )
router.post('/login', loginUser)


module.exports = router