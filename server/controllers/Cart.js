const Cart = require('../models/Cart')


// Sepeti Getir
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product')

    res.status(200).json({ success: true, cart })
  } catch (error) {
    res.status(500).json({ message: "Sepet getirilemedi" })
  }
}

// Sepete Ekle

const addToCart = async (req, res) => {
  try {
    console.log("req.user:", req.user)
    console.log("req.body:", req.body)
    const { productId, qty } = req.body
    let cart = await Cart.findOne({ user: req.user._id })

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [{ product: productId, qty }] })
    } else {
      const existItem = cart.items.find(item => item.product.toString() === productId)
      if (existItem) {
        existItem.qty += qty
      } else {
        cart.items.push({ product: productId, qty })
      }
      await cart.save()
    }
    await cart.populate('items.product');
    res.status(200).json({ success: true, cart })
  }
  catch (error) {
    res.status(500).json({ message: "Ürün sepetten silinemedi" })
  }

}

// Adet güncelle


const updateCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    const item = cart.items.find(item => item.product.toString() === req.params.productId);
    if (item) {
      item.qty = req.body.qty;
      await cart.save();
    }
    await cart.populate('items.product');
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ message: "Adet güncellenemedi" });
  }
};

// Sepettten Sil
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
    cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId)
    await cart.save()
    await cart.populate('items.product');
    res.status(200).json({ success: true, cart })
  } catch (error) {
    res.status(500).json({ message: "Ürün sepetten temizlenemedi" })
  }
}

// Sepeti Temizle
const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user._id })
    res.status(200).json({ success: true, message: "Sepet temizlendi" })
  } catch (error) {
    res.status(500).json({ message: "Sepet temizlenemedi" })
  }
}

module.exports = { getCart, addToCart, clearCart, removeFromCart, updateCartItem }






