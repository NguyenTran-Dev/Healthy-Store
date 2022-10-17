import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { get_product } from '../redux/reducer/productSlice'
import { useParams } from 'react-router-dom'
const Detail = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const data_product = useSelector((state) => state.product)
  const [product, setProduct] = useState(null)
  useEffect(() => {
    if (params.id) dispatch(get_product(params.id))
  }, [])
  useEffect(() => {
    if (data_product && !product) {
      setProduct(data_product.product)
    }
  }, [data_product])
  return (
    product && <Row className='detail'>
      <Col md={5} className='detail--image'>
        <img
          className="w-100"
          src={product.img_url}
          alt="img_product"
        />
      </Col>
      <Col md={7} className='detail--info'>
        <h1>{product.name_product}</h1>
        <p>{product.desc_product}</p>
        <h3 className='text-secondary'>$ {parseFloat(product.price).toFixed(2)}</h3>
        <p className='text-success'>Stock: {product.stock}</p>
        <Button color='success' className='w-50 mt-3'><i className="icon-size bi bi-cart-plus"></i></Button>
      </Col>
    </Row>
  )
}

export default Detail
