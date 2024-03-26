// src/components/ProductList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductList() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch categories from the API
    axios.get('http://fakestoreapi.com/products/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    // Fetch products based on the selected category
    if (selectedCategory) {
      axios.get(`http://fakestoreapi.com/products/category/${selectedCategory}`)
        .then(response => setProducts(response.data))
        .catch(error => console.error(error));
    }
  }, [selectedCategory]);

  const handleTabClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="row">
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
            <div>
      <div className="categories">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleTabClick(category)}
            className={selectedCategory === category ? 'active' : ''}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
            </div>
        </div>
    
  );
}

export default ProductList;
