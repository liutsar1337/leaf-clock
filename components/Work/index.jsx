import React, {useEffect, useState} from 'react';
import s from './work.module.scss'
import classNames from "classnames";
import {Api} from "../../services";
import timestamp from "../../utils/timestamp";
import secondsToHMS from "../../utils/formatSecondsToMainTimer";
import timestampToHHMM from "../../utils/timestampToHHMM";

const Work = () => {
    let startButtonClass = classNames(s.time_block_button, s.time_block_button_start)
    let stopButtonClass = classNames(s.time_block_button, s.time_block_button_stop)

    const [selectedDescription, setSelectedDescription] = useState('');
    const [timesheets, setTimesheets] = useState([]);
    const [startTime, setStartTime] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const [timeNow, setTimeNow] = useState(0);
    const api = Api();

    const getTimesheets = async () => {
        try {
            const response = await api.timesheets.getAll();
            setTimesheets(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const createTimesheet = async () => {
        try {
            const response = await api.timesheets.create({
                billable: true,
                exported: true,
                project: 1,
                activity: 1,
                begin: timestamp(startTime),
                end: timestamp(new Date()),
                description: selectedDescription || 'No description',
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    const timerStart = () => {
        setStartTime(new Date());
        setIsActive(true);
    };

    const timerStop = async () => {
        await createTimesheet();
        setStartTime(null);
        setIsActive(false);
        setSelectedDescription('');
        setTimeNow(0);
    };

    const handleDescriptionChange = (event) => {
        setSelectedDescription(event.target.value);
    }


    useEffect(() => {
        getTimesheets()
    }, [isActive === false])

    useEffect(() => {
        let interval;

        if (isActive) {
            interval = setInterval(() => {
                setTimeNow((prevSeconds) => prevSeconds + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isActive]);


    return (
        <>
            <div className={s.time_tracker}>
            <div className={s.time_block}>
                <div className={s.time_block_digits}>{secondsToHMS(timeNow)}</div>
                <input className={s.time_block_task}
                placeholder={'Type something in'} value={selectedDescription}
                onChange={handleDescriptionChange}
                />
                {isActive ?
                    <button className={stopButtonClass} onClick={timerStop}>stop</button>
                    :
                    <button className={startButtonClass} onClick={timerStart}>start</button>}
                <div className={s.time_block_details}>
                    <div>tag</div>
                    <div>$</div>
                    <div>project</div>
                </div>
            </div>
        </div>
            <div className={s.table}>
                {/*LIU CHANGE THIS FOR TABLE HEADER*/}
                <div className={s.table_row}>
                    <div className={s.table_row_cell}>Today</div>
                    <div className={s.table_row_cell}></div>
                    <div className={s.table_row_cell}></div>
                    <div className={s.table_row_cell}></div>
                </div>
        {timesheets.map(
            (timesheet) => (
                <div className={s.table_row} key={timesheet.id}>
                    <div className={s.table_row_cell}>{timesheet.description}</div>
                    <div className={s.table_row_cell}>{timesheet.project}</div>
                    <div className={s.table_row_cell}>{secondsToHMS(timesheet.duration)}</div>
                    <div className={s.table_row_cell}>{timestampToHHMM(timesheet.begin)} - {timestampToHHMM(timesheet.end)}</div>
                </div>
            )
        )}
            </div>
        </>
    );
};

export default Work;
