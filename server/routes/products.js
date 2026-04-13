const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

const { allProducts, detailProducts, createProduct, deleteProduct, updateProduct, createReview, adminProducts } = require("../controllers/product");
const { authenticationMid, roleChecked } = require("../middleware/auth");




router.get("/products", allProducts)
router.get("/admin/products", authenticationMid, roleChecked("admin"), adminProducts)
router.get("/products/:id", detailProducts)
router.post("/admin/product/new", authenticationMid, roleChecked("admin"), createProduct)
router.post("/admin/product/newReview", authenticationMid, createReview)
router.delete("/admin/product/:id", authenticationMid, roleChecked("admin"), deleteProduct)
router.put("/admin/product/:id", authenticationMid, roleChecked("admin"), updateProduct)





module.exports = router;