require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const db = require("./config/db")
const productRoutes = require("./routes/products")
const userRoutes = require("./routes/user")
const cartRoutes = require('./routes/cart')
const cloudinary = require('cloudinary').v2



cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true
})

const app = express()
app.use(express.json({ limit: "50mb" }))
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL
        : "http://localhost:5173",
    credentials: true
}))
app.use(express.urlencoded({ limit: "50mb", extended: true }))
app.use(cookieParser())

// routes
app.use("/api", productRoutes)
app.use("/api/auth", userRoutes)
app.use('/api/cart', cartRoutes)
app.get("/", (req, res) => {
    res.status(200).json({ message: "Server çalışıyor" })


})

app.get("/api/test", (req, res) => {
    res.json({ message: "API çalışıyor" })
})

db()

// --------------- Server kurulumu  -------
const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
    console.log(`server ${PORT} portunda çalışıyor`)
)

