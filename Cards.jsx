import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Cardsdata from '../CardData';
import '../../components/style.css'
import { useDispatch } from 'react-redux';
import { addToItem, fetchProducts, addToCart } from '../../redux/actions/ActionCreators';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Cards = () => {
  // const [data, setData] = useState(Cardsdata);
  const [data, setData] = useState([]);
  const dispatch = useDispatch()

  const onclickAddItem = (item) => {
    dispatch(addToCart(item))
    toast.success("Added Item successfully", { autoClose: 1500, })
  }


  const fetchProducts = () => {
    axios.get(' http://localhost:3000/products').then((res) => {
      console.log('first', res)
      if (res.status === 200) {
        const products = res.data;
        setData(products);
      }
    }).catch((err) => {

    })
  }

  useEffect(() => {

   fetchProducts()
  }, [])

  console.log('res', data)

  return (
    <div className='container mt-3'>
      <div className='row d-flex justify-content-between align-items-center flex-direction-column' style={{ margin: '70px 0px', marginBottom: 120 }}>
        {
          data.map((item) => {
            return (
              <>
                <Card style={{ border: '1px solid black', display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }} className="mx-2 mt-4 card_style p-1" key={item.id}>
                  <Card.Body >
                    <div style={{ display: "flex", alignItems: 'center', gap: 170 }}>
                      <Card.Img className='mt-3' variant="top" src={item.image} style={{ height: '10rem', width: '10rem' }} />
                      <div>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Title>{item.category}</Card.Title>
                        <Card.Text>
                          Price: ₹ {item.price}
                        </Card.Text>
                      </div>
                    </div>

                  </Card.Body>
                  <div className="button_div d-flex justify-content-center w-10 m-4" >
                    <Button variant="primary" className='col-lg-12' style={{ backgroundColor: "yellow", border: "none", color: "black" }}
                      onClick={() => onclickAddItem(item)}
                    >Add to cart</Button>
                  </div>
                </Card>
              </>
            )
          })
        }
      </div>
    </div>
  )
}

export default Cards;