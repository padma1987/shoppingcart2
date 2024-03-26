
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {toast} from "react-toastify";
import {Link} from 'react-router-dom';
import UpdateProduct from './UpdateProduct';

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(`men's clothing`);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
const[rating,setRating]=useState({
  "rate":2.1,
  "count":430
});
const[file,setFile]=useState();
function handleChange(e){
  console.log(e.target.files);
  setFile(URL.createObjectURL(e.target.files[0]));
  
}
  useEffect(() => {
    // Fetch categories from FakeStoreAPI
    axios
      .get('https://fakestoreapi.com/products/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleAddProduct = (e)=> {
    e.preventDefault()
      let  newProduct = {
        category: selectedCategory,
        title: name,
        description,
        price: parseFloat(price),
        image: file, // Include the image URL in the request
      };
      console.log("newProduct",newProduct)

      
        fetch('http://localhost:3000/products',{
        method:"POST",
        headers: { 'content-type': 'application/json' },
        body:JSON.stringify(newProduct)
    })
    .then((res)=>{
      console.log("res",res)
      toast.success('Product Added successfully')
    }).catch((err)=>{
      toast.error('Failed:'+err.message)
    })
  }

  return (
     
    <div className="container mt-4">
       <h1>Product Search App</h1>
      {/* <UpdateProduct /> */}
     <div class="row"></div>
      <div class="col-md-4">
        <img src={file} alt="Product image" width="100" height="100" style={{marginRight:10,marginTop:70}}/>
       </div>
       <div class="col-md-8">
       <div className="form-group">
        <label>Product Name:</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className='col-md-4'>
      <div className="form-group">
        <label>Category:</label>
        <select
          className="form-control"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="men's clothing">Mens clothing</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      </div>
      <div className='col-md-4'>
      <div className="form-group">
        <label>Price:</label>
        <input
          type="number"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      </div>
      <div className="form-group">
        <label>Image URL:</label>
        <input
          type="file"
          onChange={handleChange}
        />
      </div>
      <button className="btn btn-primary" style={{display:"flex"}} onClick={handleAddProduct}>
        Add Product
      </button>
      <Link to="products">Go to Products List</Link>
    </div>
    </div>
  );
};

export default AddProduct;
