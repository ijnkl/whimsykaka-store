// backend/src/routes/admin.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { verifyToken, requireAdmin } = require('../middleware/auth');

// ✅ [GET] 取得所有會員清單
router.get('/users', verifyToken, requireAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: '伺服器錯誤' });
  }
});

// ✅ [PATCH] 更新角色（禁止改自己）
router.patch('/users/:id/role', verifyToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!['USER', 'ADMIN'].includes(role)) {
    return res.status(400).json({ success: false, message: '角色無效' });
  }

  // 防止修改自己角色
  if (req.user._id.toString() === id) {
    return res.status(403).json({ success: false, message: '禁止修改自己的角色' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true }).select('-password');
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: '找不到使用者' });
    }

    res.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error('❌ 變更角色失敗:', err);
    res.status(500).json({ success: false, message: '伺服器錯誤' });
  }
});

// ✅ [DELETE] 刪除帳號（禁止刪除自己）
router.delete('/users/:id', verifyToken, requireAdmin, async (req, res) => {
  const { id } = req.params;

  if (req.user._id.toString() === id) {
    return res.status(403).json({ success: false, message: '禁止刪除自己帳號' });
  }

  try {
    await User.findByIdAndDelete(id);
    res.json({ success: true, message: '使用者已刪除' });
  } catch (err) {
    console.error('❌ 刪除帳號失敗:', err);
    res.status(500).json({ success: false, message: '伺服器錯誤' });
  }
});

module.exports = router;
