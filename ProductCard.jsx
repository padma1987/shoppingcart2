import React, { useCallback, useEffect } from 'react'
import { updateProduct } from '../../../redux/actions/ActionCreators';
import { useDispatch } from 'react-redux'
import {  toast } from 'react-toastify';

import '../styles.css'
import { useNavigate } from 'react-router-dom';

function ProductCard(props) {
    const [price, setPrice] = React.useState(0)
    const { productData } = props
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const updatePrice = useCallback((e) => {
        e.preventDefault();
        dispatch(updateProduct(productData.id, price))
        navigate('/')
        toast.success("Updated successfully", { autoClose: 1500, })
        
    }, [price, productData])

    useEffect(() => {
        setPrice(productData.price)
    }, [productData])

  return (
      <div className='product-list'>
          <div>
              <img className='product-image' src="" alt="" />
          </div>
          <div>
              <div className='list-item'>
                  <p>Name : </p>
                  <p>{productData?.title}</p>
              </div>
              <div className='list-item'>
                  <p>Description : </p>
                  <p>{productData?.description}</p>
              </div>
              <div className='list-item'>
                  <p>Category : </p>
                  <p>{productData?.category}</p>
              </div>
              <div className='list-item'>
                  <p style={{ margin: 0 }}>Price :</p>
                  <input value={price} name='price' onChange={(e) => setPrice(e.target.value)} />
              </div>
              <button className='update-btn' onClick={updatePrice}>Update price</button>
          </div>

      </div>
  )
}

export default ProductCard