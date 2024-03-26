import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deleteItem } from '../../redux/actions/ActionCreators';
import { toast } from 'react-toastify';
import { AiTwotoneDelete } from 'react-icons/ai'
import { MdOutlineCancel } from 'react-icons/md'
import { BsFillCartFill } from 'react-icons/bs'
import { Button, Modal, Table } from 'react-bootstrap';
import "./Checkout.css"
const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const cartData = useSelector((state) => state.addItemsReducer.cart)
    const [price, setPrice] = useState(0);

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
        navigate('/')
    };
    const handleShow = () => setShow(true);

    const hadleDeleteItem = (id) => {
        dispatch(deleteItem(id))
        //  handleClose()
        toast.error("Deleted item successfully", { autoClose: 1500 })
    }

    const totalPrice = useMemo(() => {
        let price = 0
        cartData.map((data, i) => {
            price = data.price * data.qnty + price
        })
        return price
        // setPrice(price)
    }, [cartData])

    // React.useEffect(() => {
    //     totalPrice()
    // }, [totalPrice])

    return (
        <div className='card_details' style={{ margin: '100px 0px' }}>
            {
                cartData.length ?
                    <div className='card_details' style={{ maxHeight: 300 }}>
                        <div>
                            <div>
                                {
                                    cartData.map((data) => {
                                        return (
                                            <div className='hi'>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: "1px solid black", margin: " 20px 120px" }} className='cardDetailAtCheckout'>
                                                    <div style={{ display: 'flex', gap: 20, }} className='contentDiv'>
                                                        <Link to={`/cartdetails/${data.id}`} style={{ cursor: 'pointer', padding: "10px" }} className='link'>
                                                            <img src={data.image} alt="" style={{ width: "5rem", height: "5rem" }} className='img' />
                                                        </Link>
                                                        <div className='hiiii'>
                                                            <p><strong>Product Name :</strong> {data.category}</p>
                                                            <p><strong>Price :</strong> ₹ {data.price * data.qnty}</p>
                                                            <p><strong>Quantity :</strong> {data.qnty} </p>
                                                            {/* <p onClick={() => hadleDeleteItem(data.id)} ><AiTwotoneDelete className='smalltrash' color='red' cursor="pointer" /></p> */}
                                                        </div>
                                                    </div>
                                                    <div>

                                                        <div className='mt-5' onClick={() => hadleDeleteItem(data.id)}>
                                                            {/* <p><AiTwotoneDelete className='largetrash' color='red' cursor="pointer" /></p> */}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, margin: "10px 120px" }} className='BuyDiv'>
                                    <p className='text-center'><strong>Total Amount to be paid : </strong>₹ {totalPrice}</p>
                                    <Button variant="primary" onClick={handleShow} className='buyBtn'>
                                        Buy now
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="card_details d-flex justify-content-center align-items-center" style={{ position: "relative", padding: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
                            <p style={{ fontSize: 20 }}>Your cart is empty</p>
                            <BsFillCartFill
                                className='emptycart_img'
                                style={{ fontSize: 28, color: 'red' }}
                            />
                        </div>
                    </div>
            }

            {/* success pop */}
            {<Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Body style={{ display: 'grid', justifyContent: 'center' }}>
                    <h5>Thank you for Shopping...!</h5>
                    <h6>Order placed Successfully</h6>
                    <h6>OrderId : #0000000000</h6>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose} style={{ textDecoration: 'underline' }}>
                        Continue Shopping
                    </Button>
                </Modal.Footer>
            </Modal>}

        </div>
    )
}

export default Checkout