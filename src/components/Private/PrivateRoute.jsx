import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';


const PrivateRoute = ({children}) => {
    const loc=useLocation();
    const {user,loading}=useContext(AuthContext)

    console.log(loc)

    if(loading){
        return <p>Waiting</p>
    }

    if(user){
        return children
    }else{

    }
    return <Navigate state={{from: loc}} to="/login" replace >

    </Navigate>
};

export default PrivateRoute;