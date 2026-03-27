const bcrypt = require('bcrypt');

async function run() {
  const hash = await bcrypt.hash('123456', 10); // 你要的密碼
  console.log('加密後的密碼:', hash);
}
run();
