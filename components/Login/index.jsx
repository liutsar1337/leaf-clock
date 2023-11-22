import React, {useEffect} from 'react';
import {useForm, Controller} from 'react-hook-form';
import s from './login.module.scss'
import {useCookies} from "react-cookie";
import {Api} from "../../services";
import {setUser} from "../../redux/slices/auth";
import {useDispatch} from "react-redux";

const LoginForm = () => {
    const {control, handleSubmit, formState: {errors}} = useForm();
    const [cookies, setCookies, removeCookies] = useCookies(['user', 'token']);

    const sevenDays = 60 * 60 * 24 * 7
    const api = Api()

    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        const response = await api.auth.login(data);
        if (response.status === 200) {
            setCookies('user', data.email, {maxAge: sevenDays});
            setCookies('token', data.password, {maxAge: sevenDays});
            dispatch(setUser(response.data))
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Email:</label>
                <Controller
                    name="email"
                    control={control}
                    rules={{required: 'Email is required'}}
                    render={({field}) => <input {...field} type="email"/>}
                />
                <span>{errors.email && errors.email.message}</span>
            </div>
            <br/>
            <div>
                <label>Password:</label>
                <Controller
                    name="password"
                    control={control}
                    rules={{required: 'Password is required'}}
                    render={({field}) => <input {...field} type="password"/>}
                />
                <span>{errors.password && errors.password.message}</span>
            </div>

            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
