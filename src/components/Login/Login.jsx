
import React, { useContext, useRef, useState } from 'react';
import './Login.css'
//import { GithubAuthProvider, GoogleAuthProvider, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../../firebase/firebase.init';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';


const Login = () => {

    const loc=useLocation()
    console.log(loc)

    const navigate=useNavigate();
    console.log('Navigate: ')
    const Go=loc?.state?.from?.pathname || '/'
   // console.log(navigate)


    const {user,googleSignIn,LogOut,registerByGithub, resetPassword,emailSignIn}=useContext(AuthContext)


    const emailRef=useRef()

    const [googleLogin,setGoogleLogin]=useState(false)
    const [githubLogin,setGithubLogin]=useState(false)
  
    const [error,setError]=useState("")

    const handleGoogleSignIn=()=>{
        googleSignIn()
        .then(result=>{
            const loggedUser=result.user;
            console.log(loggedUser)
           // setUser(loggedUser)
            console.log(loggedUser.emailVerified)
            setGoogleLogin(true)
            setError("")
            navigate(Go, {replace:true} )
        })
        .catch(error=>{
            console.error(error.message)
            setError(error.message)
        })
    }

    const handleSignout=()=>{
        signOut(auth)
        .then((result)=>{
            console.log(result)
            //setUser("")
            setGoogleLogin(false)
            setError("")
        })
        .catch(error=>{
            console.log(error.message)
            setError(error.message)
        })
    }


    const handleGithubSignIn=()=>{
        registerByGithub()
        .then(result=>{
            const loggedUser=result.user;
            console.log(loggedUser)
           // setUser(loggedUser)
            setGithubLogin(true)
            setError("")
        })
        .catch(error=>{
            console.log(error.message)
            setError(error.message)
        })
    }

    const handleEmailLogin=(event)=>{
        event.preventDefault();
        const form=event.target;
        const email=form.email.value;
        const password=form.password.value;

        console.log(email,password)
        emailSignIn(email,password)
        .then(result=>{
            const loggedUser=result.user;
            console.log(loggedUser)
          

            if(!loggedUser.emailVerified){
                setError("Email is not verified")
            }else{
               // setUser(loggedUser)
                setError("")
            }
           
    
        })
        .catch(error=>{
            console.error(error.message)
            setError(error.message)
        })
    }

    const handleResetPAssword=(event)=>{
        const email= emailRef.current.value
        console.log(email)
        if(!email){
            alert('Write email')
        }else{
            resetPassword(email)
            .then(()=>{
                alert('Check Your Email')
            })
            .catch(error=>{
                console.log(error.message)
                setError(error.message)
            })
        }
    }

    return (
        <div>

            <h2>Login Here</h2>

            <form onSubmit={handleEmailLogin}>
                <h3>Login by Email</h3>
                <input type="email" name="email" id="email" placeholder='Email' ref={emailRef} />
                <input type="password" name="password" id="" placeholder='Password' />
                <input type="submit" value="Log in" />
                <p>New user? go to <Link  to='/register'>Registration</Link></p>
            </form>
            <p>Forget Password? <button onClick={handleResetPAssword}>Reset password</button> </p> <br />
        
        
        
        
        
             {/* <button onClick={handleGoogleSignIn}>Sign in by Google</button> */}
           {
             googleLogin ?
            <button>Logged by Google</button>:
            <button onClick={handleGoogleSignIn}>Sign in by Google</button>
          }

          <br />

           {
             githubLogin ?
            <button>Logged by Github</button>:
            <button onClick={handleGithubSignIn}>Sign in by Github</button>
            }

          {
            user && 
            <div> 
                <h4> Name: {user.displayName} </h4>
               { user.email && <h4> Email: {user.email} </h4>}
               {user.emailVerified ?
                <h4>Verification: <small className='verified'> Verified</small> </h4>:
                <h4>Verification: <small className='nVerified'>Not verified</small>  </h4>
                }
                <img src={user.photoURL} alt="" /> <br />

                {user.emailVerified}
                <button onClick={handleSignout}>Sign Out</button>
            </div>
          }



        {
          error &&
          <p className="errorclass"> {error} </p>
        }
        </div>
    );
};

export default Login;