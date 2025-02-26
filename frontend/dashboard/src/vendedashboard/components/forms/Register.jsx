import React,{useState} from 'react'
import {API_Path} from '../../Helpers/ApiPath'

const Register = ({showloginHandler}) => {

const [username,setusername]=useState("");
const [email,setemail]=useState("");
const [password,setpassword]=useState("");
// this state is for error
const [error,seterror]=useState("")

const [loading,setloading]=useState(true)

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const handlesubmit=async(e)=>{
  e.preventDefault();
  if (!validateEmail(email)) {
    alert('Please enter a valid email address');
    return;
  }
  try {
    const response=await fetch(`${API_Path}vender/register`,{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({username,email,password})
    })
    const data=await response.json()
    if(response.ok){
      console.log(data);
      setusername("")
      setemail("")
      setpassword("")
      alert("Vender Register Sucessfully")
      showloginHandler()

    }

  } catch (error) {
    console.error("registration failed",error)
    alert("Registration Failed")
  }
}


  return (
    <div className="registersection">
        <form className='authForm' onSubmit={handlesubmit}>
        <h3>Hunger Hub</h3>
        <label>Usename</label>
        <input type="text" 
        name='username' 
        value={username} 
        onChange={(e)=>setusername(e.target.value)}
         placeholder='Enter Your Username' /><br />
        <label>Email</label>
        <input type="email"
         name='email'
          value={email} 
          onChange={(e)=>setemail(e.target.value)}
           placeholder='Example@gmail.com' /><br />
        <label>Password</label>
        <input type="Password"
         name='password'
          value={password} 
          onChange={(e)=>setpassword(e.target.value)} 
          placeholder='Enter Your Password' /><br />
        <div className="btnSubmit">
            <button type='submit'>Register</button>
            </div>
      </form>
    </div>
  )
}

export default Register