import React from 'react';
import Nav from 'react-bootstrap/Nav'

import NewConvo from '../newconvo/index';
import {useAuth} from '../../auth/context/authContext';

const Navbar = () => {
    const {logout} = useAuth()
    return(
        <>
        <Nav>
            <h1>Chat App</h1>
            <button className="sign-out" onClick={() => logout()}>Sign Out</button>
        </Nav>
        </>    
    )
}
export default Navbar;