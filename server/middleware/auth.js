const User = require("../models/user")
const jwt = require("jsonwebtoken")

const authenticationMid = async (req, res, next) => {
    let token;

    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    } else if (req.headers.authorization?.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ message: "Erişim için lütfen login olunuz" });
    }

    try {

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);


        const user = await User.findById(decodedData.id);

        if (!user) {
            return res.status(401).json({ message: "Kullanıcı bulunamadı, tekrar giriş yapın." });
        }

        req.user = user;
        next();
    } catch (error) {

        console.log("JWT Hatası:", error.message);
        return res.status(401).json({ message: "Token süresi dolmuş veya geçersiz!" });
    }
};
const roleChecked = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(400).json({ message: "Giriş için izniniz bulunmamaktadır!!!" })
        }
        next()
    }
}


module.exports = { authenticationMid, roleChecked }
