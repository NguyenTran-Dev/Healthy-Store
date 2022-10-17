import React from 'react'
import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
  Row,
  Col,
} from 'reactstrap'

const CardItem = (props) => {
  const { item, detailHandler } = props
  return (
    <Card>
      <div className="p-2" style={{height: 250}}>
        <img alt="Sample" src={item.img_url} className="w-100" />
      </div>
      <CardBody>
        <CardTitle tag="h5">{item.name_product}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          $ {item.price}
        </CardSubtitle>
        <CardText>
          <span className="d-inline-block text-truncate w-75">
            {item.desc_product}
          </span>
        </CardText>
        <Row className="d-flex justify-content-around">
          <Col sm={12} md={6}>
            <Button color="success" className="w-100 btn-success">
              Add Cart
            </Button>
          </Col>
          <Col sm={12} md={6}>
            <Button
              color="outline-info"
              className="w-100"
              onClick={() => detailHandler()}
            >
              Detail
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default CardItem
