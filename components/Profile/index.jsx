import React, {useEffect} from 'react'
import {useCookies} from 'react-cookie';
import {Link} from "react-router-dom";
import {Api} from "../../services";
import {useSelector} from 'react-redux'
import s from './profile.module.scss'
import profileSettingsImage from '../../imgs/profile-settings-avatar.png'

export default function Profile() {
    const [cookies] = useCookies(['user'])
    const {user} = cookies
    const userInfo = useSelector(state => state.auth.user)

    useEffect(() => {
        console.log(userInfo)
    }, [])

    const notSpecified = "Not specified"

    return (
        <div className={s.profile_settings}>
            <img className={s.profile_settings_image} src={profileSettingsImage} alt="avatar"/>
            <div className={s.profile_settings_details}>
                <h1 className={s.profile_settings_title}>Personal details</h1>
                <div className={s.profile_settings_divider}></div>
                <div className={s.profile_settings_group}>
                    <div className={s.profile_settings_label}>Username: </div>
                    <div className={s.profile_settings_value}>{userInfo?.username}</div>
                </div>
                <div className={s.profile_settings_group}>
                    <div className={s.profile_settings_label}>User Title: </div>
                    <div className={s.profile_settings_value}>{userInfo?.title
                        ? userInfo?.title
                        : <div
                        className={s.profile_settings_value_notspecified}>
                            Not specified
                        </div>}
                    </div>
                </div>
                <div className={s.profile_settings_group}>
                    <div className={s.profile_settings_label}>Email: </div>
                    <div className={s.profile_settings_value}>{user}</div></div>
                <div className={s.profile_settings_group}>
                    <div className={s.profile_settings_label}>Timezone:</div>
                    <div className={s.profile_settings_value}>{userInfo.timezone}</div>
                </div>
            </div>
        </div>
    )
}
