import React, {useEffect} from 'react'
import {useCookies} from 'react-cookie';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/slices/auth";

export default function MainScreen() {
    const [cookies, setCookies, removeCookies] = useCookies(['user', 'token'])
    const dispatch = useDispatch()

    const logout = () => {
        removeCookies('user')
        removeCookies('token')
        dispatch(setUser(null))
    }
    return (
        <div>
            <h1>Hello from Liu!</h1>
            <Link to={'/login'}>Login</Link>
            <br/>
            <button onClick={logout}>Logout</button>
            <br/>
            <Link to={'/register'}>Register</Link>
            <br/>
            <Link to={'/profile'}>Profile</Link>
            <br/>
            <Link to={'/work'}>Work</Link>
            <br/>
        </div>
    )
}
