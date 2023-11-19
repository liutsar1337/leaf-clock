import React, {useEffect} from 'react'
import {useCookies} from 'react-cookie'

export default function MainScreen() {
    const [userCookie, setUserCookie] = useCookies(['X-AUTH-USER'])
    const [tokenCookie, setTokenCookie] = useCookies(['X-AUTH-TOKEN'])
    const setAuthUserCookie = (token) => {
        setUserCookie('X-AUTH-USER', `${token}`, { secure: true, httpOnly: true });
    };
    const setAuthTokenCookie = (token) => {
        setTokenCookie('X-AUTH-TOKEN', `${token}`, { secure: true, httpOnly: true });
    }
    useEffect(() => {
        setAuthUserCookie('Liu')
        setAuthTokenCookie('1337')
    })


    return (
        <div>
            <h1>Hello from Liu!</h1>
        </div>
    )
}
