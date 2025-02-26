import React, { useState ,useEffect} from 'react'
import Navbar from '../components/navbar'
import Sidebar from '../components/Sidebar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/welcome'
import AllProducts from '../components/AllProducts'

const LandingPage = () => {
  // this props for login page intially false when we click on the login button
  //  it will convert into true then login componet will active
  const [showlogin, setshowlogin] = useState(false)
   // /this props for regiter page intially false when we click on the register. onclick will triger
   //  and calls the showloginHandler  function in this function setshowregister having the value
   //  true then register component will display on the UI
  const [showRegister,SetShowRegister]=useState(false)
  // this props for adding the firm to the database
  const [showfirm,setshowform]=useState(false)
  // this is for adding the products to the particular firm
  const [showproduct,setshowproduct]=useState(false)

  const [showwelcome,setshowwelcome]=useState(false)

  const [showaalproducts,setshowallproducts]=useState(false)
  const [showlogout,setshowlogout]=useState(false)
  const[showfirmtitle,setshoefirmtitle]=useState(true)

useEffect(()=>{
const logintoken=localStorage.getItem("logintoken")
if(logintoken){
setshowlogout(true)
setshowwelcome(true)
}

},[])

useEffect(()=>{
const firmname=localStorage.getItem("firmname");
if(firmname){
  setshoefirmtitle(false)
}
},[])


const logouthandler=()=>{
  confirm("Are you sure to logout?")
  localStorage.removeItem("logintoken");
  localStorage.removeItem("firmid")
  localStorage.removeItem("firmname")
  setshowlogout(false)
  setshowallproducts(false)
setshowproduct(false)
setshowform(false)
setshoefirmtitle(true)

}


  const showloginHandler = () => {
    setshowlogin(true)
    SetShowRegister(false)
    setshowform(false)
    setshowproduct(false)
    setshowwelcome(false)
    setshowallproducts(false)
    
  }

  const showregisterhandler=()=>{
    SetShowRegister(true)
    setshowlogin(false)
    setshowform(false)
    setshowproduct(false)
    setshowwelcome(false)
    setshowallproducts(false)
     
  }
   const showfirmHandler = () => {
    if(showlogout){
    setshowlogin(false)
    SetShowRegister(false)
    setshowform(true)
    setshowproduct(false)
    setshowwelcome(false)
    setshowallproducts(false)
    }else{
      alert("Please Login")
      setshowlogin(true)
    }
    
  }
  const showproductHandler = () => {
    if(showlogout){
    setshowlogin(false)
    SetShowRegister(false)
    setshowform(false)
    setshowproduct(true)
    setshowwelcome(false)
    setshowallproducts(false)
  }else{
    alert("Please Login")
    setshowlogin(true)
  }
    
  }
  const showwelcomeHandler = () => {
    setshowlogin(false)
    SetShowRegister(false)
    setshowform(false)
    setshowproduct(false)
    setshowwelcome(true)
    setshowallproducts(false)
    
  }
  const showallproductsHandler = () => {
    if(showlogout){
    setshowlogin(false)
    SetShowRegister(false)
    setshowform(false)
    setshowproduct(false)
    setshowwelcome(false)
    setshowallproducts(true)
  }else{
    alert("Please Login")
    setshowlogin(true)
  }
    
  }
 

  
  return (
    <>
      <section className='landingsection'>
        <Navbar showloginHandler={showloginHandler} 
        showregisterhandler={showregisterhandler}
         showlogout={showlogout} 
         logouthandler={logouthandler}/>


        <div className="collectionsection">
          <Sidebar showfirmHandler={showfirmHandler} 
          showproductHandler={showproductHandler}
           showallproductsHandler={showallproductsHandler} 
           showfirmtitle={showfirmtitle}/>


          {showlogin && <Login showwelcomeHandler={showwelcomeHandler}/>}
          {showRegister && <Register showloginHandler={showloginHandler}/>}
          {showfirm &&  showlogout && <AddFirm />}
          {showproduct && showlogout && <AddProduct />}
          {showwelcome && < Welcome />}
          {showaalproducts && showlogout && <AllProducts />}
         
          
        </div>


      </section>
    </>
  )
}

export default LandingPage