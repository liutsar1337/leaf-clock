import React, {useEffect} from 'react';
import {useForm, Controller} from 'react-hook-form';
import s from './work.module.scss'
import classNames from "classnames";

const Work = () => {
    const test = 3
    let ifStart = true
    let startButtonClass = classNames(s.time_block_button, s.time_block_button_start)
    let stopButtonClass = classNames(s.time_block_button, s.time_block_button_stop)

    return (
        <div className={s.time_tracker}>
            <div className={s.time_block}>
                <div className={s.time_block_digits}>10:00</div>
                <div className={s.time_block_task}>Working on time tracking page</div>
                <button className={startButtonClass}>{ifStart ? "Start" : "Stop"}</button>
                <div className={s.time_block_details}>
                    <div>tag</div>
                    <div>$</div>
                    <div>project</div>
                </div>
            </div>
        </div>
    );
};

export default Work;
