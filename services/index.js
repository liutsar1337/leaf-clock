import { UserApi } from './userApi';
import axios from 'axios';
import {useCookies} from "react-cookie";


export const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const Api = () => {
    const [userCookies] = useCookies(['X-AUTH-USER']);
    const [tokenCookies] = useCookies(['X-AUTH-TOKEN']);

    const authUserCookie = userCookies['X-AUTH-USER']
    const authTokenCookie = tokenCookies['X-AUTH-TOKEN']

    const instance = axios.create({
        baseURL: API_URL,
        withCredentials: true,
    });

    instance.interceptors.request.use((config) => {
        if (authUserCookie && authTokenCookie) {
            config.headers['X-AUTH-USER'] = authUserCookie;
            config.headers['X-AUTH-TOKEN'] = authTokenCookie;
        }
        return config;
    });

    const apis = {
        auth: AuthApi(instance),
    };

    return apis;
};
