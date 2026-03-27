const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { verifyToken, requireAdmin } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// 📁 multer 設定
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ✅ 圖片上傳（要 admin 登入）
router.post('/upload', verifyToken, requireAdmin, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: '沒有圖片被上傳' });
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ success: true, imageUrl });
});

// ✅ 取得所有商品（公開）
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (err) {
    console.error('❌ 取得商品錯誤:', err);
    res.status(500).json({ success: false, message: '伺服器錯誤' });
  }
});

// ✅ 新增商品（需 admin）
router.post('/', verifyToken, requireAdmin, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ success: true, product: newProduct });
  } catch (err) {
    console.error('❌ 新增商品失敗:', err);
    res.status(400).json({ success: false, message: '新增失敗' });
  }
  if (!req.body.category) {
    return res.status(400).json({ success: false, message: '請提供分類' });
  }
});

// ✅ 編輯商品（需 admin）
router.patch('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const updates = {};
    if (req.body.name !== undefined) updates.name = req.body.name;
    if (req.body.price !== undefined) updates.price = Number(req.body.price);
    if (req.body.stock !== undefined) updates.stock = Number(req.body.stock);
    if (req.body.description !== undefined) updates.description = req.body.description;
    if (req.body.category !=== undefined) updates.category = req.body.category;

    const updated = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: '商品不存在' });
    res.json({ success: true, product: updated });
  } catch (err) {
    console.error('❌ 更新商品失敗:', err);
    res.status(400).json({ success: false, message: '更新失敗' });
  }
});

// ✅ 刪除商品（需 admin）
router.delete('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: '商品不存在' });
    res.json({ success: true, message: '商品已刪除' });
  } catch (err) {
    console.error('❌ 刪除商品失敗:', err);
    res.status(500).json({ success: false, message: '刪除失敗' });
  }
});

module.exports = router;
