const express = require('express');
const { getAllProducts, getProductById } = require('./products'); // Import product functions

const router = express.Router();

// Route to get all products
router.get('/products', async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Route to get a single product by ID
router.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product' });
  }
});

module.exports = router;
