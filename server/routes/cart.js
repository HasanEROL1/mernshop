const express = require('express')
const router = express.Router()
const { getCart, addToCart, clearCart, removeFromCart, updateCartItem } = require("../controllers/Cart")
const { authenticationMid } = require('../middleware/auth')

router.get('/', authenticationMid, getCart)
router.post("/add", authenticationMid, addToCart)
router.delete("/remove/:productId", authenticationMid, removeFromCart)
router.delete("/clear", authenticationMid, clearCart)
router.put("/update/:productId", authenticationMid, updateCartItem)


module.exports = router