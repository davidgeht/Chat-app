import React, {useState, createContext, useContext} from "react";
import {auth} from '../firebase/firebase';
import "firebase/firebase-functions";
import firebase from 'firebase/app';

import {useAuthState} from 'react-firebase-hooks/auth';
const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({ children }){
    // current user is just to mimic our userinfo, thats where were getting the resident id from 
    const [currentUser,setCurrentUser]=useState({
        _id:1,
        firstName:"David",
        lastName:"Gehtman",
        email:"davidgehtman@gmail.com"
    });
    const [user]=useAuthState(auth);
    // again this user has no purpose but to check if any one is logged in, were not using any information from this user.
    function login() {
        const provider= new firebase.auth.GoogleAuthProvider();
        return auth.signInWithPopup(provider)
    }
    function logout(){
        return auth.signOut()

    }

    const value ={
        currentUser,
        setCurrentUser,
        login,
        logout,
        user,
    }

    
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}