import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
  <div className='errorsection'>
    <Link to="/">
    <button>Go Back</button>
    </Link>
        <h1>404</h1>
        <div>Page Not Found</div>
    </div>
    </>
  
  )
}

export default NotFound