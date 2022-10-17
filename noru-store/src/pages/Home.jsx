import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'reactstrap'
import CardItem from '../common/components/CardItem'
import Slider from '../common/components/Slider'
import { get_list_product } from '../redux/reducer/productSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
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
    return products.slice(products.length-4,5).map((product, product_index) => {
      if (product_index <= 4) {
        return (
          <Col md={3} key={product._id} className='mt-4'>
            <CardItem
              item={product}
              detailHandler={() => detailHandler(product._id)}
            />
          </Col>
        )
      }
    })
  }
  const renderProductsSeller = () => {
    return products.slice(0,4).map((product, product_index) => {
      if (product_index <= 4) {
        return (
          <Col md={3} key={product._id} className='mt-4'>
            <CardItem
              item={product}
              detailHandler={() => detailHandler(product._id)}
            />
          </Col>
        )
      }
    })
  }
  return (
    <div>
      <Row>
        <Slider />
        <h2 className="text-center mt-4 text-success">New Product</h2>
        <Row className="mx-auto">{!!products.length ? renderProducts() : 'Loading...'}</Row>
        <div className="d-block text-center mt-4">
          <a href="/product">
            <Button className="w-50" color="success">
              View More
            </Button>
          </a>
        </div>
      </Row>
      <Row className="mt-4">
        <h3>Best Seller</h3>
        <Row className="mx-auto">{!!products.length ? renderProductsSeller() : 'Loading...'}</Row>
      </Row>
    </div>
  )
}

export default Home
