import React, { useState } from 'react'
import { filterProductList } from '../../redux/actions/ActionCreators';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ProductCard from './ProductCard/ProductCard';
import './styles.css'
import { useNavigate } from 'react-router-dom';


function UpdateList() {
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const products = useSelector((state) => state.addItemsReducer.products)

    const filterSearch = (e) => {
        e.preventDefault()
        if (search === ''){
            toast.error('Please provide search text', { autoClose: 500, })
            return;
        }
        const createQuery = '?' + new URLSearchParams({ title: search }).toString()
        dispatch(filterProductList(createQuery))
    }

  React.useEffect(() => {
    //   dispatch(filterProductList())
  }, [])

  return (
    <div className='update-list-container'>
        <div className='search-filter-section'>
              <form onSubmit={filterSearch}>
                  <p>Search : </p>
                  <input placeholder='Search by Name' onChange={(e) => setSearch(e.target.value)} />
                  <button type='submit'>Search</button>
            </form>

              <p onClick={() => navigate('/')}>Go to product list</p>
        </div>
        <div className='product-list-section'>
            {
                products?.length > 0 && products.map((product) => <ProductCard productData={product} />)
            }
              
        </div>
    </div>
  )
}

export default UpdateList