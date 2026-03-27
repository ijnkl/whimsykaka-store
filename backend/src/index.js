const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth.jsx');

app.use(cors());
app.use(express.json()); // 處理 JSON 請求
app.use('/api', authRoutes); // prefix API 路由

app.listen(5137, () => {
  console.log('🚀 Server running on http://localhost:5137');
});
