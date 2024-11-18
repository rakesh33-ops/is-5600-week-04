const fs = require('fs').promises;
const path = require('path');
const productsFile = path.join(__dirname, 'data/full-products.json');

async function list({ offset = 0, limit = 25, tag } = {}) {
  const data = JSON.parse(await fs.readFile(productsFile));
  let filteredProducts = data;

  if (tag) {
    filteredProducts = filteredProducts.filter(product => product.tags.includes(tag));
  }
  
  return {
    products: filteredProducts.slice(offset, offset + limit),
    total: filteredProducts.length
  };
}

async function get(id) {
  const products = JSON.parse(await fs.readFile(productsFile));
  return products.find(product => product.id === id) || null;
}

module.exports = { list, get };
