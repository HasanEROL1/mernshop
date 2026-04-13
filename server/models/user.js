const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    avatar: {
        public_id: {
            type: String,
            required: false,
            default: ""
        },
        url: {
            type: String,
            required: false,
            default: ""
        },

    },
    address: {
        city: { type: String, default: "" },
        district: { type: String, default: "" },
        street: { type: String, default: "" }
    },
    role: {
        type: String,
        required: true,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,


}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)