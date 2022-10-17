import React from 'react'
import { Col, Input, Nav, NavItem, NavLink, Row } from 'reactstrap'

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <Row className="align-items-center">
          <Col md={2}>
            <h1>
              <a href="/" className="text-white">
                <i>H-store</i>
              </a>
            </h1>
          </Col>
          <Col md={3}>
            <Nav>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/product">Products</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">About</NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col md={4}>
            <Input placeholder="Search..." className="header--search p-2" />
          </Col>
          <Col md={2}>
            <Nav>
              <NavItem>
                <NavLink href="#">Cart</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Alert</NavLink>
              </NavItem>
              <NavItem></NavItem>
            </Nav>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Header
