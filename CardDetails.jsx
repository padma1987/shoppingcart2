import Table from 'react-bootstrap/Table'
import React from 'react'
import '../../components/style.css'
import { AiTwotoneDelete } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToItem, deleteItem, removeItems,fetchProducts } from '../../redux/actions/ActionCreators'
import { toast } from 'react-toastify'

function CardDetails() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartData = useSelector((state) => state.addItemsReducer.cart)
  const { id } = useParams();
  const [filteredData, setFilteredData] = React.useState([])

  const singleItemFilter = () => {
    const filteritem = cartData.filter((item) => item.id == id)
    setFilteredData(filteritem);
  }

  React.useEffect(() => {
    singleItemFilter()
  }, [id])

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id))
    navigate('/')
    toast.error("Deleted item sucessfully", { autoClose: 1000 })

  }

  const increaseItem = (data) => {
    dispatch(addToItem(data))
  }

  const removeItem = (item) => {
    dispatch(removeItems(item))
  }

  return (
    <>
      <div className="container mt-2">
        <h2 className='text-center'>Item detail</h2>
        <section className='container'>
          <div className="iteamsdetails">
            {
              filteredData.map((data) => {
                return (
                  <>
                    <div className="items_img">
                      <img src={data.image} alt="" />
                    </div>
                    <div className='details' style={{ marginTop: 40 }}>
                      <Table>
                        <tr>
                          <td>
                            <p><strong>Price</strong> : ₹ {data.price}</p>
                            <p><strong>Total</strong> : ₹ {data.price * data?.qnty}</p>
                            <div className='mt-5 d-flex justify-content-between align-items-center'
                              style={{ width: 100, cursor: 'pointer', background: '#ddd', color: "#111" }}
                            >
                              <span style={{ fontSize: 22 }} onClick={data?.qnty <= 1 ? () => handleDeleteItem(data.id) : () => removeItem(data)}>-</span>
                              <span style={{ fontSize: 22 }}>{data?.qnty}</span>
                              <span style={{ fontSize: 22 }} onClick={() => increaseItem(data)}>+</span>


                            </div>
                          </td>
                          <td>
                            <strong>Rating</strong>: <span style={{ background: 'green', color: '#fff', padding: '3px 6px', borderRadius: 5 }}>{data.rating}</span>
                            <p><strong>Order Review :</strong> <span>{data.somedata}</span></p>
                            <p><strong>Remove :</strong>
                              <span onClick={() => handleDeleteItem(data.id)}>
                                <AiTwotoneDelete color='red' cursor="pointer" />
                              </span>
                            </p>

                          </td>
                        </tr>
                      </Table>
                    </div>
                  </>
                )
              })
            }
          </div>
        </section>
      </div >
    </>
  )
}

export default CardDetails