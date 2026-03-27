// backend/src/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET || 'jacklovelin';

// 驗證 token（不管角色，只確認有登入）
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: '未提供 token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // 只存解碼後資料（userId, role）
    next();
  } catch (err) {
    console.error('❌ token 驗證失敗:', err);
    return res.status(403).json({ success: false, message: 'token 無效' });
  }
};

// 限制必須是 admin 的 middleware
const requireAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId); // 從 verifyToken 加進來的 user 資訊
    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({ success: false, message: '沒有管理員權限' });
    }
    req.user = user; // 加上完整 user 資料
    next();
  } catch (err) {
    console.error('❌ admin 權限驗證失敗:', err);
    res.status(500).json({ success: false, message: '伺服器錯誤' });
  }
};

module.exports = {
  verifyToken,
  requireAdmin,
};
