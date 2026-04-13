const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const crypto = require("crypto");
const nodemailer = require("nodemailer");


// ===================== REGISTER =====================
const register = async (req, res) => {
    try {
        let avatarData = {};

        if (req.body.avatar) {
            const uploaded = await cloudinary.uploader.upload(req.body.avatar, {
                folder: "avatars",
                width: 130,
                crop: "scale",
            });

            avatarData = {
                public_id: uploaded.public_id,
                url: uploaded.secure_url,
            };
        }

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Tüm alanları doldurun" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Kullanıcı zaten var" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Şifre en az 6 karakter olmalı" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            avatar: avatarData,
        });

        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(201).json({
            user: newUser,
            token,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// ===================== LOGIN =====================
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Kullanıcı bulunamadı" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Şifre hatalı" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            user,
            token,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// ===================== LOGOUT =====================
const logout = async (req, res) => {
    res.status(200).json({
        message: "Çıkış başarılı",
    });
};


// ===================== FORGOT PASSWORD =====================
const forgotPassword = async (req, res) => {
    try {
        const email = req.body.email.toLowerCase();

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı" });
        }

        const resetToken = crypto.randomBytes(20).toString("hex");

        user.resetPasswordToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

        await user.save({ validateBeforeSave: false });

        const passwordUrl = `${process.env.FRONTEND_URL}/reset/${resetToken}`;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Şifre Sıfırlama",
            html: `<p>Şifre sıfırlama linkiniz: <a href="${passwordUrl}">${passwordUrl}</a></p>`,
        });

        res.status(200).json({
            message: "Mail gönderildi",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
// ===================== RESET PASSWORD =====================
const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: "Token geçersiz" });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({ message: "Şifre en az 6 karakter olmalı" });
        }

        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        const tokenJWT = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            message: "Şifre sıfırlandı",
            token: tokenJWT,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// ===================== USER DETAIL =====================
const userDetail = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// ===================== UPDATE USER =====================
const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı" });
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.avatar) {
            const uploaded = await cloudinary.uploader.upload(req.body.avatar, {
                folder: "avatars",
                width: 130,
                crop: "scale",
            });

            user.avatar = {
                public_id: uploaded.public_id,
                url: uploaded.secure_url,
            };
        }
        if (req.body.address) {
            user.address = {
                city: req.body.address.city || user.address?.city,
                district: req.body.address.district || user.address?.district,
                street: req.body.address.street || user.address?.street,
            }
        }

        const updated = await user.save();

        res.status(200).json({ user: updated });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
console.log(process.env.EMAIL_USER)
console.log(process.env.EMAIL_PASS)

// ===================== EXPORT =====================
module.exports = {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    userDetail,
    updateUser,
};