const Product = require('./models/Product');
const User = require('./models/user');
const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();

const seedProducts = async () => {
    try {

        console.log("Bağlantı Adresi:", process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Bağlantısı Başarılı!');


        await Product.deleteMany();
        console.log('Eski ürünler  temizlendi.');

        let admin = await User.findOne();
        if (!admin) {
            console.log("⚠️ Kullanıcı yok, Admin oluşturuluyor");
            admin = await User.create({
                name: "Hasan Admin",
                email: "admin@test.com",
                password: "password123",
                role: "admin",

                avatar: {
                    public_id: "admin_avatar_01",
                    url: "https://placeholder.com"
                }
            });
        }


        const productsData = JSON.parse(fs.readFileSync('./products.json', 'utf8'));


        const finalProducts = productsData.map(product => ({
            ...product,
            user: admin._id
        }));


        await Product.insertMany(finalProducts);
        console.log('Ürünler yerleştitildi');

        process.exit();
    } catch (error) {
        console.log('❌ HATA VAR:', error.message);
        process.exit(1);
    }
};

seedProducts();
