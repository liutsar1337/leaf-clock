import axios from 'axios';
import {useCookies} from "react-cookie";
import {AuthApi} from "./routes/authApi";
import {ActivityApi} from "./routes/activityApi";
import {ProjectApi} from "./routes/projectApi";
import {TimesheetsApi} from "./routes/timesheetsApi";

export const Api = () => {
    const [cookies]= useCookies(['user', 'token']);
    const {user, token} = cookies;

    const instance = axios.create({
        baseURL: import.meta.env.VITE_APP_CLOUD_API,
        // withCredentials: true,
    });

    instance.interceptors.request.use((config) => {
        if (user && token) {
            config.headers['X-AUTH-USER'] = user;
            config.headers['X-AUTH-TOKEN'] = token;
        }
        console.log(config)
        return config;
    });

    const apis = {
        auth: AuthApi(instance),
        activities: ActivityApi(instance),
        projects: ProjectApi(instance),
        timesheets: TimesheetsApi(instance)
    };

    return apis;
};
