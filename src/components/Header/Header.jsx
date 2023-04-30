import React, { useContext } from 'react';
import './Header.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const Header = () => {
    const {user,LogOut}=useContext(AuthContext)

    const handleLogout=()=>{
        LogOut()
        .then(()=>{
            console.log("LogOut")
        })
        .catch(error=>{
            console.log(error.message)
        })
    }

    return (
        <div className='header'>
            <Link to='/'>Home</Link>
            <Link to='/secret'>Secret</Link>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Registration</Link>

            {
                user?
                <span className='mail'> <img className='headerPic' src={user.photoURL} alt="" /> {user.email}  <button onClick={handleLogout} className='headerbtn'>Logout</button> </span>
                :
                <Link to='/login'><button>Log in</button> </Link>
            }

          
        </div>
    );
};

export default Header;