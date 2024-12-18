const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();


// Cài đặt middleware
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}));

// Import các routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

// Sử dụng các routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

// Route trang chủ
app.get('/', (req, res) => {
  res.render('index', { user: req.session.user });
});

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server chạy trên port ${PORT}`);
});
