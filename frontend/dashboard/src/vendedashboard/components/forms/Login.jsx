import React, { useState } from 'react'
import { API_Path } from "../../Helpers/ApiPath"

const Login = ({ showwelcomeHandler }) => {

  const [email, setemail] = useState("")
  const [password, setpassword] = useState("");

  const loginhandler = async (e) => {
    e.preventDefault();
    try {
      // console.log("here try started")
      const response = await fetch(`${API_Path}vender/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })
     
      const data = await response.json()
      if (!response.ok || !data.token) {
        alert("login failed please try again later")
        setemail("")
        setpassword("")
        return;
      }
       
        alert("login sucessfully")
        setemail("")
        setpassword("")
        // this is for token stroage purpose   {it will accept one name for token and another one is token}
        localStorage.setItem("logintoken", data.token);
       
     
      const venderid = data.venderid;
      console.log("this is my vender id from try block",venderid)
      if (!data.venderid) {
        console.error("Vendor ID not found.");
        return;
      }
     
      // console.log("checking for vender id", venderid)
      try {
        const venderresponse = await fetch(`${API_Path}vender/single-vendor/${venderid}`)
      const venderdata = await venderresponse.json();
      
     const venderfirmname=venderdata.vendor.firm[0].firmname;
      
      if(!venderresponse.ok){
        console.error("failed to fetch vender data")
        return;
      }
      const venderfirmid = venderdata.venderfirmid;
      // console.log("checking forfirm id", venderfirmid);
      localStorage.setItem("firmid", venderfirmid)
      localStorage.setItem("firmname",venderfirmname)
      showwelcomeHandler()
      } catch (vendererror) {
        console.error("error fetching vender details:",vendererror)
      }
      
     
        
       

     
        
        // const vendorfirmname=venderdata.vendor.firm[0].firmname;
        // console.log(vendorfirmname)

        window.location.reload()
      
      

      //     else {
      //   alert(data.error || "Login failed. Please try again.");
      // }



    } catch (error) {
      console.log("error during login",error)
      alert("login fail")


    }
  }


  return (
    <div className="loginSection">

      <form className='authForm' onSubmit={loginhandler}>
        <h3>Hunger Hub</h3>
        <label>Email</label>
        <input type="text"
          name='email'
          value={email}
          onChange={(e) => setemail(e.target.value)}
          placeholder='Enter Your Email'
          required /><br />
        <label>Password</label>
        <input type="Password"
          name='password'
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder='Enter Your Password'
          required /><br />
        <div className="btnSubmit" ><button type="submit">Login</button></div>
      </form>
    </div>
  )
}

export default Login