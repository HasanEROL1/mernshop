const Product = require('../models/Product');
const ProductFilter = require('../utils/productFilter');
const cloudinary = require('cloudinary').v2;

// TÜM ÜRÜNLER
const allProducts = async (req, res) => {
    try {
        const resultPerPage = 12;

        const apiFilterCount = new ProductFilter(Product.find(), req.query)
            .search()
            .filter();
        const filteredProductsCount = await apiFilterCount.query.countDocuments();


        const apiFilter = new ProductFilter(Product.find(), req.query)
            .search()
            .filter()
            .pagination(resultPerPage);

        const products = await apiFilter.query;

        res.status(200).json({
            success: true,
            products,
            productsCount: filteredProductsCount,
            resultPerPage,
        });
    } catch (error) {
        console.error("🔥 ERROR:", error);
        res.status(500).json({ message: 'Veritabanından ürünler çekilemedi!' });
    }

};

// ÜRÜN DETAY
const detailProducts = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Ürün bulunamadı' });
        }

        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        res.status(500).json({ message: 'Ürün detayı getirilirken hata oluştu!' });
    }
};

// ÜRÜN OLUŞTUR (ADMIN)
const createProduct = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        let images = [];
        if (req.body.images) {
            if (typeof req.body.images === "string") {
                images.push(req.body.images);
            } else {
                images = req.body.images;
            }
        }

        let allImage = [];
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.uploader.upload(images[i], { folder: "products" });
            allImage.push({
                public_id: result.public_id,
                url: result.secure_url
            });
        }
        if (allImage.length === 0) {
            return res.status(400).json({ message: "Lütfen en az bir resim yükleyin!" });
        }

        req.body.images = allImage;
        req.body.user = req.user._id;

        const product = await Product.create(req.body);

        res.status(201).json({ success: true, product });

    } catch (error) {
        console.error("🔥 CREATE ERROR:", error);
        res.status(500).json({ message: 'Ürün oluşturulamadı!', error: error.message });
    }
};

// ÜRÜN SİL (ADMIN)
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Ürün bulunamadı' });
        }

        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.uploader.destroy(product.images[i].public_id);
        }

        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: "Ürün Başarıyla Silindi"
        });

    } catch (error) {
        res.status(500).json({ message: 'Ürün silinirken hata oluştu!' });
    }
};

// ÜRÜN GÜNCELLE (ADMIN)
const updateProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Ürün bulunamadı" });
        }

        // Yeni image geldiyse eskiyi sil
        if (req.body.images !== undefined && req.body.images !== null) {
            for (let i = 0; i < product.images.length; i++) {
                await cloudinary.uploader.destroy(product.images[i].public_id);
            }

            let images = typeof req.body.images === "string"
                ? [req.body.images]
                : req.body.images;

            let allImage = [];

            for (let i = 0; i < images.length; i++)
                if (images[i].startsWith("data:image")) {

                    const result = await cloudinary.uploader.upload(images[i], { folder: "products" });

                    allImage.push({
                        public_id: result.public_id,
                        url: result.secure_url
                    });
                } else {
                    const existingImg = product.images.find(img => img.url === images[i]);
                    if (existingImg) allImage.push(existingImg);
                }

            req.body.images = allImage;
        } else {
            delete req.body.images;
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            returnDocument: 'after',
            runValidators: true,

        });

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        console.error("❌ UPDATE ERROR:", error);
        res.status(500).json({
            message: 'Ürün güncellenemedi!',
            error: error.message
        });
    }
};

// YORUM EKLE
const createReview = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { productId, comment, rating } = req.body;

        const product = await Product.findById(productId);

        // Aynı kullanıcı tekrar yorum yapamasın
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            return res.status(400).json({ message: "Zaten yorum yaptınız" });
        }

        const review = {
            user: req.user._id,
            name: req.user.name,
            comment,
            rating: Number(rating)
        };

        product.reviews.push(review);

        // Rating hesaplama (safe)
        if (product.reviews.length > 0) {
            let avg = 0;
            product.reviews.forEach(rev => avg += rev.rating);
            product.rating = avg / product.reviews.length;
        }

        await product.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            message: "Yorum eklendi"
        });

    } catch (error) {
        res.status(500).json({ message: 'Yorum eklenemedi!' });
    }
};

const adminProducts = allProducts;

module.exports = {
    allProducts,
    detailProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    createReview,
    adminProducts
};