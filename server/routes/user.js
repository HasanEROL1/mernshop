const express = require("express")
const router = express.Router()


const { register, login, logout, forgotPassword, resetPassword, userDetail, updateUser } = require('../controllers/user')
const { authenticationMid } = require("../middleware/auth")



router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword/:token', resetPassword)
router.get('/me', authenticationMid, userDetail)
router.put('/update', authenticationMid, updateUser)






module.exports = router