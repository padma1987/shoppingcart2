import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsFillCartFill } from 'react-icons/bs'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Menu from '@mui/material/Menu';
import { Badge } from '@mui/material';
import { MdOutlineCancel } from 'react-icons/md'
import '../../components/style.css'
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { AiTwotoneDelete } from 'react-icons/ai'
import { deleteItem } from '../../redux/actions/ActionCreators';
import { toast } from 'react-toastify';


const Header = () => {
    const [user, setUser] = useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const cartData = useSelector((state) => state.addItemsReducer.cart)
    const [price, setPrice] = useState(0)

    const handleClick = (event) => {
        // setAnchorEl(event.currentTarget);
        navigate('/checkout')
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const hadleDeleteItem = (id) => {
        dispatch(deleteItem(id))
        handleClose()
        toast.error("Deleted item successfully", { autoClose: 1500 })
    }

    const totalPrice = () => {
        let price = 0
        cartData.map((data, i) => {
            price = data.price * data.qnty + price
        })
        setPrice(price)
    }

    React.useEffect(() => {
        totalPrice()
    }, [totalPrice])

    useEffect(() => {
        const userDetails = localStorage.getItem('user_details')
        if (userDetails !== null){
            setUser(JSON.parse(userDetails))
        }else{
            // navigate('/login')
        }
    }, [])

    return (
        <>
            <Navbar style={{ height: 70, background: "#769acf", position: 'fixed', width: '100%', top: 0, zIndex: 5 }}>
                <Container>
                   <div>
                        <NavLink style={{ pointerEvents: user ? '' : 'none'}} to="/" className="text-decoration-none text-light"><u>Shopping Site</u></NavLink>
                        {
                            user && (
                                <p style={{ color: 'white', fontWeight: 'bold' }}>Welcome, {user ? user.firstname + " " + user.lastname : ''}</p>
                            )
                        }
                   </div>
                    
                    <div>
                        
                        {
                            user && (
                                <>
                                    <Badge badgeContent={cartData.length} color='primary'
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                        style={{ cursor: 'pointer', color: "black", backgroundColor: "yellow", padding: "5px 15px", margin: '0 5px', borderRadius: "10px" }}
                                    >
                                        Cart
                                    </Badge>
                                    <Badge color='primary'
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={() => navigate('/Addproduct')}
                                        style={{ cursor: 'pointer', color: "black", backgroundColor: "yellow", padding: "5px 15px", margin: '0 5px', borderRadius: "10px" }}
                                    >
                                        Add Products
                                    </Badge>
                                    <Badge color='primary'
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={() => {
                                            localStorage.removeItem('user_details')
                                            navigate('/login')
                                            window.location.reload()
                                        }}
                                        style={{ cursor: 'pointer', color: "black", backgroundColor: "yellow", padding: "5px 15px",margin: '0 5px',  borderRadius: "10px" }}
                                    >
                                        Logout
                                    </Badge>
                                </>
                                
                            )
                        }
                        
                    </div>
                </Container>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                </Menu>
            </Navbar>
        </>
    )
}

export default Header