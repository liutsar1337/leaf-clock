import s from './topbar.module.scss'
import React, {useEffect, useRef, useState} from 'react'
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import leafclockLogo from '../../imgs/leafclock-logo.svg'
import {setUser} from "../../redux/slices/auth";
import {useCookies} from "react-cookie";
import classNames from "classnames";


export default function TopBar() {
    const userIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 965 1024"
            className={s.user_icon}
            fill={"darkgreen"}
        >
            <path
                d="M459.3 164c-28.6 3-59.4 12.1-83.2 24.6-12.4 6.5-19.9 11.5-30.1 19.9-33.4 27.8-53.7 63.2-60 104.4-1.4 9.5-1.4 36.1 0 47.7 2.2 17.8 9 41.5 18.1 62.9 2.8 6.6 5.6 13.2 6.2 14.6 1 2.4.6 3.2-3.1 7.5-9.3 10.5-13.2 21-13.2 35.4 0 15 5.1 27.1 16 38.1 6.9 6.8 16.4 12.5 23 13.5l3.6.6 3.8 12c4 12.5 13 32 19.3 41.7 2 3.1 7.2 10.2 11.5 15.8l7.8 10.2v73.6l13.5 13.5 13.5 13.5v-74.4l9.3 6.6c10.2 7.3 26.9 15.6 39.2 19.6 22.6 7.4 49.4 7.6 72 .6 13.5-4.1 35.1-15.3 44.5-23 1.9-1.6 3.8-2.9 4.2-2.9.5 0 .8 16.5.8 36.6 0 24.3.3 36.5 1 36.2.6-.2 6.7-5.9 13.5-12.8l12.5-12.4v-75.1l5.6-6.5c13.3-15.5 25.5-37.5 32.8-59l4.6-13.5 4.7-1.6c13.3-4.5 24.7-13.7 31.1-25 3.8-6.7 7.2-19.2 7.2-26.3-.1-12.6-5.1-25.9-13.3-35.1l-4.4-4.9 5.3-12.8c16.3-39.3 23.3-71.9 22.1-102.3-1.3-31.6-9.1-54-24.1-69.1-9.3-9.3-22-15.4-32.3-15.4-1.7 0-3.4-.4-3.7-.9-.3-.5 2.1-8 5.5-16.7 6.8-17.9 17.9-49 17.9-50.3 0-.5-4.4 1.4-9.7 4.1-15.4 7.7-22.5 9.2-43.3 9.2-19.6.1-19.4.1-47-9-32.3-10.7-47.3-13.4-75-13.9-10.7-.2-23.2 0-27.7.5zm132 148.5c7.6 17.9 17.6 37 27.3 51.8l6.6 10-.5 61.1c-.3 38.9-.8 63.8-1.6 68.6-.6 4.1-1.6 10.4-2.2 14-3.7 22.2-17.3 50.6-34.7 72.5-7.6 9.6-10.3 12.4-20.6 21.6-19.3 17.2-37.5 26.5-58.9 29.9-10.8 1.8-31 .8-40.7-2-8.8-2.5-24-9.5-31.9-14.7-27.3-17.9-52.8-49.5-64-79.3-4.8-12.7-6.2-19.9-10.3-53-3-24.5-3.1-27.4-3.5-71.4-.3-25.2-.2-47.3.1-49 .4-1.7 2.6-5.2 5.1-7.8l4.5-4.7 8.7 5.1c17.5 10.1 41.2 18.8 60.8 22.3 12.6 2.3 34.9 3 47 1.6 17.9-2.1 37.2-8.1 52.4-16.4 25.8-14 46.2-38.3 52.2-62 .6-2.6 1.3-4.6 1.4-4.5.2.2 1.4 3 2.8 6.3zm-261.4 160c1.9 11.8 3.8 31.5 3 31.5-1.8 0-8.3-7.7-10.5-12.4-1.7-3.6-2.4-6.9-2.4-11.3 0-7 1-10.3 4.7-15.2 3.1-4 3.4-3.7 5.2 7.4zm330.7-3c4.8 10.1 2.3 21.4-6.6 30l-4.1 4 .5-5c1.5-13 3.7-30.3 4.2-33.3.5-2.8.9-3.1 2.2-2 .8.7 2.6 3.5 3.8 6.3z"/>
            <path
                d="M327 703.1c-56.3 20.3-99.8 41-123.7 58.8-20.9 15.6-36.7 38.3-43.4 62.1-4.8 17.3-9.6 53.8-7.8 58.8 1.1 3 3.2 3.6 17.4 5.6 127.6 17.1 306.9 23.5 457.5 16.1 58.6-2.9 132.4-9.1 177-15 23-3.1 25.8-3.8 26.6-7 1.4-5.6-3.5-39-8.2-56.3-10.2-37.2-30.5-60.9-70.4-82.5-22.3-12-66.8-30.6-103.2-43.1-4.2-1.4-8.4-2.9-9.2-3.2-1.1-.4-6 3.7-16.4 13.8-24.7 24.2-46.2 41.8-82.3 67.8-22.2 15.9-34.3 23.7-40.1 25.7-6.4 2.2-16.3 1.3-23-2.2-7.2-3.7-35.9-23.5-57-39.4-23.3-17.4-45.4-36-62.4-52.5-7.8-7.5-14.4-13.6-14.5-13.5-.2 0-7.8 2.7-16.9 6z"/>
        </svg>
    );

    useEffect(() => {
        console.log(user)
    }, []);

    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch();
    const [cookies, setCookies, removeCookies] = useCookies(['user', 'token'])
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const logout = () => {
        removeCookies('user')
        removeCookies('token')
        dispatch(setUser(null))
    }
    const handleLogout = () => {
        logout()
        setPopupVisibility(false);
    };

    const handleContainerUserClick = () => {
        setPopupVisibility(!isPopupVisible);
    };

    return (
        <div className={s.content}>
            <Link to={'/'} className={s.custom_link}>
                <div className={s.container_logo}>
                    <img src={leafclockLogo} alt="leafclock logo" className={s.logo}/>
                    <div className={s.logo_title}>LeafClock</div>
                </div>
            </Link>
            <div>
                <div className={s.container_right_main}>
                    {user === null &&
                        <div className={s.container_auth}>
                            <Link className={s.custom_link} to={'/login'}>
                                <div className={classNames(s.button, s.button_login)}>Log In</div>
                            </Link>
                            <Link className={s.custom_link} to={'/register'}>
                                <div className={classNames(s.button, s.button_register)}>Sign Up</div>
                            </Link>
                        </div>
                    }
                    {user && <>
                        <div className={s.container_user} onClick={handleContainerUserClick}>
                            <div className={s.user_name}>{user.username}</div>
                            <span>{userIcon}</span>
                        </div>
                        {isPopupVisible && (
                            <div className={classNames(s.popup, {[s._visible]: isPopupVisible})}>
                                <Link to={'/profile'} className={s.custom_link}>
                                    <div
                                        className={classNames(s.popup_item)}
                                        onClick={() => {
                                            setPopupVisibility(false)
                                        }}>
                                        My Profile
                                    </div>
                                </Link>
                                <div className={s.popup_item} onClick={handleLogout}>
                                    Logout
                                </div>
                                <div
                                    className={s.popup_item}
                                    onClick={() => setPopupVisibility(false)}
                                >
                                    Cancel (remove it)
                                </div>
                            </div>
                        )}
                    </>}
                </div>
            </div>
        </div>
    )
}


