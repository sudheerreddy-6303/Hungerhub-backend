import React from 'react'

const Sidebar = ({showfirmHandler,
  showproductHandler,
  showallproductsHandler,
  showfirmtitle}) => {
  return (
    <div className="sidebarsection">
        <ul>
          {showfirmtitle ? <li onClick={showfirmHandler}>Add firm</li> : ""}
            
            <li onClick={showproductHandler}>Add product</li>
            <li onClick={showallproductsHandler}>All products</li>
            <li>User Details</li>
        </ul>
    </div>
  )
}

export default Sidebar