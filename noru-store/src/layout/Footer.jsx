import React from 'react';
import { Col, Row } from 'reactstrap';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='container'>
        <Row className='pt-4'>
          <Col md={3}>
            <h2>Healthy Shop</h2>
            <ul>
              <li>
                <i className='bi bi-shop'></i>
                <span>43 Ham Nghi Street - Da Nang City</span>
              </li>
              <li>
                <i className='bi bi-telephone-fill'></i>
                <span>0943.999.999</span>
              </li>
              <li>
                <i className='bi bi-envelope-fill'></i>
                <span>supportnthtshop@gmail.com</span>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h4>Information Shop</h4>
            <ul>
              <li>
                <a>Introduction</a>
              </li>
              <li>
                <a>Recruitment</a>
              </li>
              <li>
                <a>News</a>
              </li>
              <li>
                <a>Promotion information</a>
              </li>
              <li>
                <a>Contact, comment</a>
              </li>
              <li>
                <a>Corporate customers</a>
              </li>
              <li>
                <a>Company Account</a>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h4>Support Customer</h4>
            <ul>
              <li>
                <a>Delivery policy</a>
              </li>
              <li>
                <a>General policy</a>
              </li>
              <li>
                <a>Warranty Policy</a>
              </li>
              <li>
                <a>Return policy</a>
              </li>
              <li>
                <a>Customer information privacy policy</a>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.9913676069373!2d108.20840128142618!3d16.06593774550601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219fb4c320b31%3A0x98ba3181bc04e65e!2zTGFwdG9wIGdhbWluZyDEkeG7kyBob-G6oSDEkMOgIG7hurVuZw!5e0!3m2!1svi!2s!4v1663237968457!5m2!1svi!2s'
              width='300'
              height='210'
              loading='lazy'
              ></iframe>
          </Col>
        </Row>
      </div>
      <div className='text-center footer--coppyright pb-1 pt-3'>
        <p>
          <span dangerouslySetInnerHTML={{ __html: '&copy;' }} />
          Copyright 2022 by <i className='text-success'>Healthy Shop</i>. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
