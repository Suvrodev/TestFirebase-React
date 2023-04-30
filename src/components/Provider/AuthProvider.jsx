import React, { createContext, useEffect, useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../../firebase/firebase.init';

export const AuthContext=createContext("")

const AuthProvider = ({children}) => {
    const auth=getAuth(app)
    
    const [loading,setLoading]=useState(true)
    const [user,setUser]=useState("")

    //Sign in by Email start
    const emailSignIn=(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }
    //Sign in by Email end

    ///Sign in By Google Start
    const googleProvider=new GoogleAuthProvider();
    const googleSignIn=()=>{
       return signInWithPopup(auth,googleProvider)
    }
    ///Sign in By Google End



    ///Register by Email start
    const registerByEmail=(email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }
    ///Register by Email end


    //Register by gitHub Start
    const gitProvider=new GithubAuthProvider()
    const registerByGithub=()=>{
        return signInWithPopup(auth,gitProvider)
    }
    //Register by gitHub end


    ///Reset Password Start
    const resetPassword=(email)=>{
        return sendPasswordResetEmail(auth,email)
    }
    ///Reset Password end


    //mail verification start
    const verifyUserEmail=()=>{
        return sendEmailVerification(auth)
    }
    //mail verification end

    ///updateProfile start

    ///updateProfile end

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,(currentUser)=>{
           // console.log('CR: ',currentUser)
           // if(currentUser?.emailVerified){
                setUser(currentUser)
                setLoading(false)
           // }
           
        })

        return ()=> unSubscribe
    },[])


    const LogOut=()=>{
       return signOut(auth)
    }
    

    const authInfo={
        user,
        registerByEmail,
        LogOut,
        googleSignIn,
        registerByGithub,
        resetPassword,
        registerByGithub,
        emailSignIn,
        loading,
        

    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;