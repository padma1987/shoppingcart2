import React, { useState } from 'react';
import axios from 'axios';


 const UpdateProduct=()=> {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [productData, setProductData] = useState(null);
  
  const handleSearch = () => {
    // Replace with the actual API endpoint and parameters
    fetch('https://fakestoreapi.com/products/19/?search=${searchQuery}')
      .then((response) => response.json())
      .then((data) => setProductData(data))
      .catch((error) => console.error('API call failed', error));
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {/* <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
          </li>
        ))}
      
      </ul> */}
      {productData && (
        <div>
          <h2>Product Details</h2>
          <p>Name: {productData.name}</p>
          <p>Price: ${productData.price}</p>
          <p>Description: {productData.description}</p>
          {/* Add more product details as needed */}
        </div>
      )}
    </div>
  );
}

export default UpdateProduct
