import React from 'react'
import { Button } from 'reactstrap'
import not_found from '../asset/images/404-error-dribbble-800x600.gif'

const NotFound = () => {
  return (
    <div className="not--found">
      <div>
        <img src={not_found} className='w-100' alt="notfound" />
      </div>
      <div className="text-center">
        <a href="/">
          <Button color="success">Back to Home Page</Button>
        </a>
      </div>
    </div>
  )
}

export default NotFound
