import React from 'react';
import {useAuth} from '../../auth/context/authContext';
const SignIn=()=>{
    const {login} = useAuth();
     return (
         <>
            <button className="sign-in" onClick={()=>{login()}}>Sign In </button>
         </>
     )    
}
export default SignIn;