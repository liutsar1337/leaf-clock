import s from './topbar.module.scss'
import React, {useEffect} from 'react'
import {useSelector} from "react-redux";

export default function TopBar() {
    const user = useSelector(state => state.auth.user)
    return (
        <div className={s.content}>
            <div>
                Logo
            </div>
            <div>
                {user ? user.username : "Login"}
            </div>
        </div>
    )
}


