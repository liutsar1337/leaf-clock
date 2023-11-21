import React, {useEffect} from 'react'
import {useCookies} from 'react-cookie';
import {Link} from "react-router-dom";
import {Api} from "../../services";
import {useSelector} from 'react-redux'

export default function Profile() {
    const [cookies] = useCookies(['user'])
    const {user} = cookies
    const userInfo = useSelector(state => state.auth.user)

    useEffect(() => {
        console.log(userInfo)
    }, [])

    return (
        <div>
            <h1>User Info</h1>
            <b>User Name: </b>
            <p>{userInfo?.username}</p>
            <b>User Title: </b>
            <p>{userInfo?.title}</p>
            <b>User Email: </b>
            <p>{user}</p>
            <p></p>
        </div>
    )
}
