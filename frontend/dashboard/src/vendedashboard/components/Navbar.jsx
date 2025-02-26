import React from 'react'

const Navbar = ({showloginHandler,showregisterhandler,showlogout,logouthandler}) => {
  const firmname=localStorage.getItem("firmname")
  return (
   <div className="navsection">
    <div className="componany">
        <h2>Hunger Hub</h2>
    </div>
    <div className="firmname">
      <h4>FirmName:{firmname}</h4>
    </div>
    <div className="userAuth">
      {!showlogout ?  <>
      <span onClick={showloginHandler}>Login /</span>
      <span onClick={showregisterhandler}>Register</span>
      </> :<span onClick={logouthandler}>Logout</span>} 
    </div>
   </div>
  )
}

export default Navbar