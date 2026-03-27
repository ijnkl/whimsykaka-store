function checkRole(...allowedRoles) {
  return (req, res, next) => {
    const role = req.user.role;
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ success: false, message: '權限不足' });
    }
    next();
  };
}

module.exports = { checkRole };