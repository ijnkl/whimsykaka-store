require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/User.js');

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// 🔗 連接 MongoDB
mongoose.connect('mongodb://localhost:27017/shopdb')
  .then(() => {
    console.log('✅ MongoDB 連線成功');
    app.listen(4000, () => {
      console.log('🚀 Server running on http://localhost:4000');
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB 連線失敗:', err);
  });

const JWT_SECRET = process.env.JWT_SECRET || 'jacklovelin';

// 📌 註冊 API
app.post('/api/register', async (req, res) => {
  console.log('✅ /api/register 被呼叫了！');
  console.log('📦 req.body:', req.body);

  const { name, email, password, phone } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: '請填寫所有必填欄位' });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email 已被註冊' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, phone });

    await user.save();
    res.json({ success: true, message: '註冊成功' });
  } catch (err) {
    console.error('❌ 註冊錯誤:', err);
    res.status(500).json({ success: false, message: '伺服器錯誤' });
  }
});

// 📌 登入 API
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ success: false, message: '請輸入 Email 和密碼' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: '找不到使用者' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: '密碼錯誤' });

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (err) {
    console.error('❌ 登入錯誤:', err);
    res.status(500).json({ success: false, message: '伺服器錯誤' });
  }
});

// 🧩 管理員 API 路由掛載
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

app.get('/api/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: '未提供 token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'jacklovelin');
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) return res.status(404).json({ success: false, message: '使用者不存在' });
    res.json({ success: true, user });
  } catch (err) {
    console.error('取得 me 錯誤:', err);
    res.status(401).json({ success: false, message: 'token 錯誤' });
  }
});
// 商品管理API
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);
app.use('/uploads', express.static('public/uploads')); // 提供靜態圖片存取


