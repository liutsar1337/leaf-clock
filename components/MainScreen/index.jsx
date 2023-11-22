import React, {useEffect} from 'react'
import {useCookies} from 'react-cookie';
import {Link} from "react-router-dom";
import {Api} from "../../services";

export default function MainScreen() {
    return (
        <div>
            <h1>Hello from Liu!</h1>
            <Link to={'/login'}>Login</Link>
            <br/>
            <Link to={'/register'}>Register</Link>
            <br/>
            <Link to={'/profile'}>Profile</Link>
            <br/>
            <Link to={'/work'}>Work</Link>
        </div>
    )
}
