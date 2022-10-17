import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import DropDown from '../common/components/DropDown'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { get_list_product } from '../redux/reducer/productSlice'
import CardItem from '../common/components/CardItem'

const Products = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const dataProduct = useSelector((state) => state.product)
  const [products, setProduct] = useState([])
  useEffect(() => {
    dispatch(get_list_product())
  }, [])
  useEffect(() => {
    setProduct(dataProduct.products)
  }, [dataProduct])
  const detailHandler = (product_id) => {
    navigate(`/detail/${product_id}`)
  }
  const renderProducts = () => {
    return products.map((product, product_index) => {
      return (
        <Col className='mt-4' md={3} key={product._id}>
          <CardItem
            item={product}
            detailHandler={() => detailHandler(product._id)}
          />
        </Col>
      )
    })
  }
  return (
    <Row>
      <Col md={2}>Nav</Col>
      <Col md={10}>
        <Row style={{ width: '100%', maxWidth: 150 }}>
          <DropDown />
        </Row>
        <hr />
        <Row>{renderProducts()}</Row>
      </Col>
    </Row>
  )
}

export default Products
