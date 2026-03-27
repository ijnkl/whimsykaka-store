// backend/src/middleware/requireAdmin.js
function requireAdmin(req, res, next) {
  if (req.user?.role !== 'ADMIN') {
    return res.status(403).json({ message: '需要管理員權限' });
  }
  next();
}

module.exports = requireAdmin;
