import React, {useEffect} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {useCookies} from 'react-cookie';
import s from './register.module.scss'
import {Api} from "../../services";
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/slices/auth";

const RegisterForm = () => {
    const {control, handleSubmit, formState: {errors}} = useForm();
    const [cookies, setCookies, removeCookies] = useCookies(['user', 'token']);
    const sevenDays = 60 * 60 * 24 * 7
    const api = Api()

    const dispatch = useDispatch()


    const onSubmit = async (data) => {
        const response = await api.auth.register(data);
        console.log(response)
        if (response.status === 200) {
            setCookies('user', data.email, {maxAge: sevenDays});
            setCookies('token', data.password, {maxAge: sevenDays});
            dispatch(setUser(response.data))
        } else {
            throw new Error('Something went wrong with register');
        }
        console.log(data);
    };

    return (
        <div className={s.form}>
            <div className={s.form_container}>
                <div className={s.form_title}>Sign Up</div>
                <form className={s.form_block} onSubmit={handleSubmit(onSubmit)}>
                    <div className={s.form_subtitle}>Create your LeafClock account</div>
                    <div>
                        {/*<label>Name:</label>*/}
                        <Controller
                            name="name"
                            control={control}
                            rules={{required: 'Name is required'}}
                            render={({field}) =>
                                <input
                                    className={s.form_input}
                                    {...field}
                                    type="text"
                                    placeholder="Enter your name"
                                />
                            }
                        />
                        <span className={s.form_error}>{errors.name && errors.name.message}</span>
                    </div>

                    <div>
                        {/*<label>Email:</label>*/}
                        <Controller
                            name="email"
                            control={control}
                            rules={{required: 'Email is required'}}
                            render={({field}) =>
                                <input
                                    className={s.form_input}
                                    {...field}
                                    type="email"
                                    placeholder="Enter your email"
                                />}
                        />
                        <span className={s.form_error}>{errors.email && errors.email.message}</span>
                    </div>
                    <div>
                        {/*<label>Password:</label>*/}
                        <Controller
                            name="password"
                            control={control}
                            rules={{required: 'Password is required'}}
                            render={({field}) =>
                                <input
                                    className={s.form_input}
                                    {...field}
                                    type="password"
                                    placeholder="Enter your password"
                                />}
                        />
                        <span className={s.form_error}>{errors.password && errors.password.message}</span>
                    </div>

                    <button className={s.form_button} type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
