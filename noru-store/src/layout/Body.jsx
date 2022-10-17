import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

const Body = () => {
  return (
    <>
      <Header />
      <div className="container my-2 body">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default Body
