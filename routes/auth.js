const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Dữ liệu tĩnh người dùng (thay thế cho cơ sở dữ liệu)
let users = [
  { username: 'admin', password: bcrypt.hashSync('password', 8) }
];

// Đăng ký (thêm người dùng vào mảng users)
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  let hashedPassword = bcrypt.hashSync(password, 8);

  users.push({ username, password: hashedPassword });
  res.redirect('/auth/login');
});

// Đăng nhập (kiểm tra người dùng từ mảng users)
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  let user = users.find(u => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.redirect('/auth/login');  // Nếu không tìm thấy hoặc mật khẩu sai
  }

  req.session.user = user;
  res.redirect('/');
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
