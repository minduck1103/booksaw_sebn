const express = require('express');
const router = express.Router();

// Dữ liệu tĩnh sản phẩm (thay thế cho cơ sở dữ liệu)
let products = [
  { id: 1, name: 'Sách A', price: 100 },
  { id: 2, name: 'Sách B', price: 150 },
];

// Xem danh sách sản phẩm
router.get('/', (req, res) => {
  res.render('products/list', { products });
});

// Thêm sản phẩm mới
router.post('/add', (req, res) => {
  const { name, price } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    price: parseFloat(price),
  };
  products.push(newProduct);
  res.redirect('/products');
});

// Sửa sản phẩm
router.post('/edit/:id', (req, res) => {
  const { name, price } = req.body;
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    product.name = name;
    product.price = parseFloat(price);
  }
  res.redirect('/products');
});

// Xóa sản phẩm
router.get('/delete/:id', (req, res) => {
  products = products.filter(p => p.id !== parseInt(req.params.id));
  res.redirect('/products');
});

module.exports = router;
