import React, { useContext, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from "../../firebase/firebase.init";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Registration = () => {
   
  const {user,registerByEmail}=useContext(AuthContext)
  //console.log(user)

  const [error,setError]=useState("")
  const [succeed,setSucceed]=useState(null)

  const handleRegister=(event)=>{
    event.preventDefault()
    const form=event.target;
    const email=form.email.value;
    const password=form.password.value;
    const name=form.name.value;
    const photo=form.photo.value;

    console.log(name,email, password,photo)

    // if(!/(?=.*\d)/.test(password)){
    //     setError('password should contain at least one digit')
    //     return
    // }

    // if(!/(?=.*[A-Z])/.test(password)){
    //     setError('password should contain at least one upper case')
    //     return
    // }
    // if(!/(?=.*[!#$%&? "])/.test(password)){
    //     setError('Password should one special character like !#$%&?')
    //     return;
    // }
    // if(password.length<8){
    //     setError('Password length should be minimum 8 words  ')
    //     return;
    // }


    registerByEmail(email,password)
    .then(result=>{
        const registeredUser=result.user;
        console.log(registeredUser)
        setError("")
        setSucceed("Successfully Registered")
        form.reset()
        emailVerification(registeredUser)
        updateUserData(registeredUser,name,photo)
    })
    .catch(error=>{
        console.error(error.message)
        setError(error.message)
    })
  }

  const updateUserData=(user,name,photo)=>{
    updateProfile(user,{
        displayName: name, 
        photoURL: photo
      })
    .then(result=>{
        console.log(result)
    })
    .catch(error=>{
        console.log(error.message)
        setError(error.message)
    })
  }

  const emailVerification=(registeredUser)=>{
    sendEmailVerification(registeredUser)
    .then((result)=>{
        console.log(result)
        setSucceed("Please verify Your Email")
    })
    .catch(error=>{
        console.log(error.message)
        setError("PIV ",error.message)
    })
  }

  const [display,setDisplay]=useState(false)
  const [type,setType]=useState("password")
  const [accept,setAccept]=useState(false)

  const displayPassword=()=>{
     setDisplay(!display)
     console.log(display)
     if(!display){
       setType("text")
     }else{
      setType("password")
     }
  }

  const handleTerms=event=>{
    const Check=event.target.checked;
    console.log(Check)
    setAccept(Check)
  }
  return (
    <div>
    
      <h2>Register Here</h2>
      <form onSubmit={handleRegister}>
        <input type="text" name="name" id="name" placeholder="Your Name" />
        <input type="text" name="photo" id="photo" placeholder="Photo url" />
        <input type="email" name="email" id="email" placeholder="Email" required />
        <input type={display?"text":"password"}  name="password" id="" placeholder="Password" required />
        <p onClick={displayPassword}> {display?"Hide Password": "Show Password"} </p>
        <div className="terms"><input className="check" onClick={handleTerms} type="checkbox" name="accept" id="accept" /> <p>Accept our terms and condition</p></div>
        <input type="submit" value="Register" disabled={!accept}/>
        <p >Already have an account? go to <Link  to='/login'>Login</Link></p>
      </form>

      {
        error &&
        <p className="errorclass"> {error} </p>
      }

      {
        succeed && 
        <p className="success"> {succeed} </p>
      }
    </div>
  );
};

export default Registration;
