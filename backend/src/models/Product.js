const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  image: { type: String, default: '' },
  category: { type: String, default: "未分類" }, // 分類欄位
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('whimsykaka-products', productSchema);
