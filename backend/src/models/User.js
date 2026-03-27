const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, default: '' },
  role: {
    type: String,
    enum: ['USER', 'ADMIN', 'MANAGER'],
    default: 'USER',
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

