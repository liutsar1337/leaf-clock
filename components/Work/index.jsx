import React, {useEffect, useState} from 'react';
import s from './work.module.scss'
import classNames from "classnames";
import {Api} from "../../services";
import timestamp from "../../utils/timestamp";
import secondsToHMS from "../../utils/formatSecondsToMainTimer";
import timestampToHHMM from "../../utils/timestampToHHMM";
import tagIcon from '../../imgs/tag.svg'
import dollarIcon from '../../imgs/dollar-billable.svg'
import projectsIcon from '../../imgs/projects.svg'
import {groupEntriesByDate, blockDisplayableDate} from "../../utils/groupEntriesByDate";
import calculateTotalDuration from "../../utils/calculateToDuration";
import findNameInObjectArray from "../../utils/findName";
const Work = () => {
    let startButtonClass = classNames(s.time_block_button, s.time_block_button_start)
    let stopButtonClass = classNames(s.time_block_button, s.time_block_button_stop)

    const [selectedDescription, setSelectedDescription] = useState('');
    const [timesheets, setTimesheets] = useState([]);
    const [isTagIconActive, setIsTagIconActive] = useState(false);
    const [isBillable, setIsDollarIconActive] = useState(false);
    const [isProjectsIconActive, setIsProjectsIconActive] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const [timeNow, setTimeNow] = useState(0);
    const [activities, setActivities] = useState([]);
    const [projects, setProjects] = useState([]);
    const api = Api();
    const getActivities = async () => {
        try {
            const response = await api.activities.getAll();
            setActivities(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const createActivity = async () => {
        try {
            const response = await api.activities.create({
                name: 'Test Activity'
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    const getProjects = async () => {
        try {
            const response = await api.projects.getAll();
            setProjects(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const createProject = async () => {
        try {
            const response = await api.projects.create({
                name: 'Test Project'
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

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
                billable: isBillable,
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

    useEffect(() => {
        getActivities()
        getProjects()
    }, [])

    const handleTagIconClick = () => {
        setIsTagIconActive(!isTagIconActive);
    };
    const handleDollarIconClick = () => {
        setIsDollarIconActive(!isBillable);
    }
    const handleProjectsIconClick = () => {
        setIsProjectsIconActive(!isProjectsIconActive);
    }


    return (
        <>
            <div className={s.time_tracker}>
                <div className={s.time_block}>
                    {/*<div className={s.time_block_timer}>Timer</div>*/}
                    <div className={s.time_block_timer}>
                        <div className={s.time_block_digits}>{secondsToHMS(timeNow)}</div>
                    </div>
                    <div className={s.time_block_container}>
                        <input
                            className={s.time_block_task}
                            placeholder={'Describe your activity'}
                            value={selectedDescription}
                            onChange={handleDescriptionChange}
                        />

                        <div className={s.time_block_details}>
                            {/*<img src={tagIcon} className={s.icon_tag} alt={"tag icon"}/>*/}
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 className={classNames(s.icon, s.icon_tag, isTagIconActive ? s.icon_active : '')}
                                 viewBox="0 0 1200 1200"
                                 onClick={handleTagIconClick}
                            >
                                <path
                                    d="m327.206 249.866 2.534-.014h2.77l2.953-.01c3.276-.011 6.552-.015 9.829-.019l7.037-.02c7.716-.021 15.432-.031 23.148-.041l7.977-.013a37610.006 37610.006 0 0 1 43.988-.046c11.534-.008 23.067-.033 34.6-.066 11.864-.033 23.727-.05 35.59-.054 6.652-.002 13.303-.011 19.955-.036 6.27-.024 12.538-.028 18.807-.018 2.29 0 4.578-.005 6.867-.02 25.369-.144 47.397 5.446 69.739 17.491l3.29 1.754c12.582 7.007 22.52 16.759 32.603 26.864a6945.749 6945.749 0 0 1 14.152 14.12c3.728 3.728 7.463 7.45 11.198 11.173 8.15 8.127 16.291 16.261 24.432 24.397 5.087 5.083 10.175 10.165 15.264 15.246 14.101 14.082 28.201 28.166 42.294 42.256l2.729 2.728a5585282.797 5585282.797 0 0 1 8.22 8.22l2.75 2.747c14.709 14.706 29.43 29.4 44.156 44.089a51306.787 51306.787 0 0 1 45.377 45.319c8.48 8.48 16.966 16.957 25.461 25.423 7.23 7.206 14.452 14.42 21.662 21.646 3.677 3.683 7.357 7.363 11.049 11.032 3.383 3.363 6.755 6.737 10.118 10.12a703.858 703.858 0 0 0 3.655 3.64c12.728 12.589 20.789 24.848 20.965 43.226-.154 17.786-7.24 29.65-19.786 42.04a1960.547 1960.547 0 0 1-11.866 11.877c-3.138 3.124-6.262 6.263-9.387 9.4a8766.354 8766.354 0 0 1-18.38 18.372c-4.987 4.973-9.969 9.95-14.947 14.932l-2.15 2.151-4.325 4.328a35956.609 35956.609 0 0 1-38.24 38.202 29259.134 29259.134 0 0 0-37.067 37.047 44882.979 44882.979 0 0 1-44.701 44.7l-2.143 2.14c-4.975 4.969-9.945 9.942-14.914 14.917a9487.791 9487.791 0 0 1-18.197 18.173c-3.097 3.085-6.19 6.172-9.275 9.268a2053.457 2053.457 0 0 1-8.51 8.488 624.24 624.24 0 0 0-3.06 3.066c-11.664 11.76-23.729 18.938-40.552 19.149-23.047-.014-36.337-14.564-51.551-29.772l-3.767-3.753c-3.426-3.415-6.85-6.833-10.272-10.25-3.701-3.696-7.405-7.388-11.109-11.081a58640.914 58640.914 0 0 1-34.34-34.276 163222.356 163222.356 0 0 1-57.924-57.856l-2.73-2.727a62328.234 62328.234 0 0 0-43.82-43.734 51276.88 51276.88 0 0 1-45.042-44.97 20296.971 20296.971 0 0 0-25.269-25.22 11102.21 11102.21 0 0 1-21.507-21.48 3765.178 3765.178 0 0 0-10.964-10.942c-3.362-3.339-6.711-6.69-10.052-10.049a687.166 687.166 0 0 0-3.622-3.604c-15.042-14.865-25.078-32.117-32.656-51.786l-.817-2.05c-6.142-16.694-7.021-33.836-6.95-51.428a3744.158 3744.158 0 0 1-.02-25.527c.01-6.52 0-13.04-.006-19.56-.008-11.635.005-23.27.025-34.904.018-10.523.015-21.046-.003-31.569-.022-12.27-.03-24.54-.018-36.81.006-6.478.007-12.955-.006-19.433-.012-6.084-.004-12.169.02-18.254.005-2.224.003-4.45-.006-6.674-.066-18.328 1.934-33.7 14.781-47.885 7.952-7.526 18.75-13.762 29.956-13.79Zm74.04 127.204C387.974 393.082 382.653 412.401 384 433c2.606 19.615 12.194 37.325 27.441 50.035 16.696 12.193 36.016 17.667 56.559 15.403 18.923-3.237 37.15-13.154 48.582-28.836 11.582-16.906 16.686-35.937 13.914-56.305-3.725-19.328-13.674-36.468-29.746-48.047-31.838-21.424-73.912-17.493-99.504 11.82Z"/>
                            </svg>
                            {/*<img src={dollarIcon}  />*/}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={classNames(s.icon, s.icon_dollar, isBillable ? s.icon_active : '')}
                                xmlSpace="preserve"
                                viewBox="0 0 256 256"
                                onClick={handleDollarIconClick}
                            >
                                <path
                                    d="M189.4 166.1c0 13.4-4.4 25-13.1 34.7-8.7 9.7-20.1 15.7-34.1 18v23c0 1.2-.4 2.2-1.2 3-.8.8-1.8 1.2-3 1.2h-17.8c-1.1 0-2.1-.4-3-1.3-.8-.8-1.3-1.8-1.3-3v-23c-5.8-.8-11.4-2.1-16.8-4.1s-9.9-3.9-13.4-5.9c-3.5-2-6.8-4.1-9.8-6.3-3-2.2-5-3.9-6.1-4.9-1.1-1.1-1.9-1.9-2.3-2.4-1.5-1.9-1.6-3.6-.3-5.4L81 172c.6-.9 1.6-1.4 3-1.6 1.3-.2 2.4.2 3.2 1.2l.3.3c9.9 8.7 20.6 14.2 32 16.5 3.3.7 6.5 1.1 9.8 1.1 7.1 0 13.4-1.9 18.8-5.7 5.4-3.8 8.1-9.1 8.1-16.1 0-2.5-.6-4.8-2-7-1.3-2.2-2.8-4-4.4-5.5-1.6-1.5-4.2-3.1-7.7-4.9-3.5-1.8-6.4-3.2-8.7-4.2-2.3-1-5.8-2.4-10.5-4.3-3.4-1.4-6.1-2.5-8.1-3.3-2-.8-4.7-2-8.1-3.5-3.4-1.5-6.2-2.9-8.2-4.1-2.1-1.2-4.6-2.7-7.4-4.7-2.9-1.9-5.3-3.8-7.1-5.6-1.8-1.8-3.7-4-5.7-6.5s-3.6-5.1-4.7-7.6c-1.1-2.6-2-5.5-2.8-8.8-.7-3.3-1.1-6.7-1.1-10.3 0-12.1 4.3-22.7 12.9-31.9 8.6-9.1 19.8-15 33.6-17.7V14.2c0-1.1.4-2.1 1.3-3 .8-.8 1.8-1.3 3-1.3h17.8c1.2 0 2.2.4 3 1.2.8.8 1.2 1.8 1.2 3v23.2c5 .5 9.9 1.5 14.5 3s8.5 3 11.5 4.4c2.9 1.4 5.7 3.1 8.4 4.9 2.6 1.9 4.3 3.1 5.1 3.8.8.7 1.4 1.3 2 1.9 1.5 1.6 1.7 3.3.7 5L174 79.5c-.7 1.3-1.7 2-3 2.1-1.2.3-2.4 0-3.6-.9-.3-.3-.9-.8-1.9-1.6s-2.7-2-5.1-3.5c-2.4-1.5-5-2.9-7.7-4.2s-6-2.4-9.8-3.4c-3.8-1-7.6-1.5-11.3-1.5-8.3 0-15.1 1.9-20.4 5.7S103 81 103 86.9c0 2.3.4 4.4 1.1 6.3.7 1.9 2 3.8 3.9 5.5 1.9 1.7 3.6 3.2 5.2 4.3 1.6 1.2 4.1 2.6 7.4 4.1 3.3 1.5 5.9 2.7 8 3.6 2 .8 5.1 2 9.2 3.6 4.6 1.8 8.2 3.1 10.7 4.1 2.5 1 5.8 2.6 10 4.6 4.2 2.1 7.5 3.9 9.9 5.6 2.4 1.7 5.1 3.9 8.2 6.6 3 2.7 5.3 5.5 7 8.4 1.6 2.8 3 6.2 4.1 10.1 1.2 3.9 1.7 8 1.7 12.4z"/>
                            </svg>
                            {/*<img src={projectsIcon} className={classNames(s.icon, s.icon_projects)} alt={"projects icon"}/>*/}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={classNames(s.icon, s.icon_projects, isProjectsIconActive? s.icon_active : '')}
                                viewBox="0 0 512 512"
                                onClick={handleProjectsIconClick}
                            >
                                <path
                                    d="m89.474 63.71 3.768-.02c3.397-.017 6.794-.023 10.192-.025 2.13 0 4.26-.005 6.39-.01 7.456-.019 14.912-.027 22.367-.026 6.91.002 13.82-.02 20.73-.051a3864.11 3864.11 0 0 1 17.884-.036c3.547 0 7.094-.005 10.642-.026 27.788-.156 46.784 2.99 67.121 23.03 4.204 4.197 8.366 8.437 12.505 12.698 15.094 15.512 30.955 27.551 53.47 28.092 3.97.046 7.94.056 11.91.044 3.267-.009 6.535.001 9.803.017 9.283.04 18.566.041 27.849.039 5.7 0 11.4.019 17.1.05 3.204.01 6.407-.002 9.61-.015 12.423.022 23.332.53 33.4 8.697 7.292 7.484 10.026 16.395 9.965 26.64l-.055 3.13L434 176h-32v-16l-3.472.027c-10.884.082-21.767.141-32.651.18-5.594.02-11.187.049-16.78.095-5.414.044-10.828.067-16.242.078-2.05.007-4.098.021-6.147.043-32.425.332-57.828-8.428-81.526-31.167-5.04-4.983-9.978-10.07-14.902-15.168a1075.572 1075.572 0 0 0-5.612-5.74l-1.674-1.755c-6.286-6.366-13.202-9.688-22.183-9.751l-3.178-.03-3.47-.017-3.667-.03c-3.313-.026-6.627-.048-9.94-.068-3.466-.022-6.93-.05-10.395-.076-6.559-.05-13.118-.095-19.677-.138-7.467-.05-14.935-.105-22.403-.16-15.36-.114-30.72-.22-46.081-.323a125094.276 125094.276 0 0 0 .262 131.262l.007 2.787c.036 14.894.06 29.79.081 44.684.022 15.28.055 30.56.099 45.84.026 9.431.044 18.862.05 28.293.006 6.464.022 12.929.047 19.393.014 3.732.023 7.463.019 11.194-.004 4.044.015 8.088.036 12.133l-.014 3.578c.049 5.657.092 10.014 3.413 14.836 4.462 4.127 7.828 5.316 13.941 5.215 4.538-.474 7.34-2.438 10.372-5.715 2.85-4.224 2.83-7.897 2.818-12.81l.006-2.274c.006-2.521.005-5.043.004-7.564l.01-5.416c.009-3.893.014-7.786.017-11.678.006-6.162.023-12.323.042-18.484l.019-6.33.01-3.202c.042-14.346.075-28.691.087-43.036.008-9.674.03-19.348.07-29.022.019-5.117.031-10.234.026-15.351-.005-4.82.01-9.64.037-14.46.007-1.762.007-3.525 0-5.288-.044-12.083.785-23.03 8.709-32.8 8.97-8.74 18.981-10.085 30.913-10.052l3.682-.014c3.36-.01 6.721-.012 10.082-.01 3.63 0 7.259-.01 10.888-.02 7.106-.017 14.212-.022 21.318-.023 5.779-.001 11.557-.005 17.335-.012 16.394-.017 32.787-.027 49.18-.025h5.357c14.328.001 28.657-.018 42.985-.046 14.723-.029 29.447-.043 44.17-.04 8.261 0 16.523-.006 24.784-.027 7.035-.019 14.07-.023 21.105-.01 3.586.008 7.172.008 10.758-.01 3.896-.019 7.79-.006 11.686.009l3.402-.031c9.759.085 18.709 2.454 26.402 8.693 7.057 7.243 10.025 16.114 10.052 26.096l.014 2.113c.013 2.318.011 4.635.01 6.953a3746.059 3746.059 0 0 1 .044 18.585c0 2.834.005 5.668.01 8.502.019 9.906.027 19.813.025 29.719 0 9.2.02 18.4.052 27.6.026 7.924.037 15.847.035 23.77 0 4.721.005 9.442.027 14.163.02 4.45.02 8.899.005 13.349-.002 1.62.002 3.24.014 4.86.15 21.174-5.326 39.504-20.37 55.052-11.56 10.793-26.944 17.181-42.789 17.202l-3.36.011-3.66-.003-3.912.01c-3.578.007-7.155.01-10.733.01-3.861.002-7.722.009-11.583.016-8.44.014-16.88.02-25.321.024l-15.82.012c-14.607.012-29.214.022-43.821.026H279.463l-5.694.002h-2.853c-15.25.005-30.498.022-45.748.045-15.666.024-31.333.036-47 .038-8.792 0-17.584.007-26.376.024-7.488.016-14.975.02-22.463.013-3.817-.004-7.634-.003-11.452.01-4.147.016-8.293.008-12.44-.003l-3.62.024c-15.569-.091-27.184-4.368-38.524-15.005-8.747-9.105-13.404-20.396-13.428-33.014l-.013-3.34v-3.639l-.01-3.89c-.01-3.557-.014-7.113-.017-10.67-.004-3.839-.014-7.677-.022-11.516-.02-9.265-.03-18.531-.039-27.797l-.015-13.099a64796.353 64796.353 0 0 1-.045-54.853l-.001-2.835c-.008-15.16-.034-30.32-.066-45.479-.033-15.573-.051-31.145-.054-46.718-.003-8.74-.011-17.48-.037-26.22-.022-7.443-.03-14.886-.02-22.329.005-3.795.003-7.59-.017-11.384-.02-4.121-.01-8.242.003-12.363l-.033-3.604c.076-9.957 2.312-18.99 8.689-26.852 9.09-8.858 19.226-10.085 31.306-10.075z"/>
                            </svg>


                            {isActive ?
                                <button className={stopButtonClass} onClick={timerStop}>Stop
                                </button>
                                :
                                <button className={startButtonClass} onClick={timerStart}>Start</button>
                            }

                        </div>


                    </div>


                </div>
            </div>
            <div>
                {/*<div className={s.table_title_box}>*/}
                {/*<p className={s.table_title}>Timesheets</p>*/}
                {/*</div>*/}
                {
                    groupEntriesByDate(timesheets).map(timesheetOfDay => (
                        <div className={s.table}>
                            <div className={s.table_header}>
                                <div className={s.table_header_cell}>{blockDisplayableDate(timesheetOfDay[0].date)}</div>
                                <div className={s.table_header_cell}></div>
                                <div className={s.table_header_cell}></div>
                                <div className={s.table_header_cell}></div>
                                <div className={s.table_header_cell}></div>
                                <div className={s.table_header_cell}></div>
                                <div className={s.table_header_cell}>Total: {secondsToHMS(calculateTotalDuration(timesheetOfDay))}</div>
                            </div>
                            {timesheetOfDay.map(timesheet => (
                                <div className={s.table_row} key={timesheet.id}>
                                    <div className={s.table_row_cell}>{timesheet.description}</div>
                                    <div className={s.table_row_cell}>
                                        {findNameInObjectArray(projects, timesheet.project)}: {findNameInObjectArray(activities, timesheet.activity, true)}
                                    </div>
                                    <div className={s.table_row_cell}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={classNames(s.icon, s.icon_dollar, timesheet.billable ? s.icon_active : '')}
                                            xmlSpace="preserve"
                                            viewBox="0 0 256 256"
                                            onClick={handleDollarIconClick}
                                        >
                                            <path
                                                d="M189.4 166.1c0 13.4-4.4 25-13.1 34.7-8.7 9.7-20.1 15.7-34.1 18v23c0 1.2-.4 2.2-1.2 3-.8.8-1.8 1.2-3 1.2h-17.8c-1.1 0-2.1-.4-3-1.3-.8-.8-1.3-1.8-1.3-3v-23c-5.8-.8-11.4-2.1-16.8-4.1s-9.9-3.9-13.4-5.9c-3.5-2-6.8-4.1-9.8-6.3-3-2.2-5-3.9-6.1-4.9-1.1-1.1-1.9-1.9-2.3-2.4-1.5-1.9-1.6-3.6-.3-5.4L81 172c.6-.9 1.6-1.4 3-1.6 1.3-.2 2.4.2 3.2 1.2l.3.3c9.9 8.7 20.6 14.2 32 16.5 3.3.7 6.5 1.1 9.8 1.1 7.1 0 13.4-1.9 18.8-5.7 5.4-3.8 8.1-9.1 8.1-16.1 0-2.5-.6-4.8-2-7-1.3-2.2-2.8-4-4.4-5.5-1.6-1.5-4.2-3.1-7.7-4.9-3.5-1.8-6.4-3.2-8.7-4.2-2.3-1-5.8-2.4-10.5-4.3-3.4-1.4-6.1-2.5-8.1-3.3-2-.8-4.7-2-8.1-3.5-3.4-1.5-6.2-2.9-8.2-4.1-2.1-1.2-4.6-2.7-7.4-4.7-2.9-1.9-5.3-3.8-7.1-5.6-1.8-1.8-3.7-4-5.7-6.5s-3.6-5.1-4.7-7.6c-1.1-2.6-2-5.5-2.8-8.8-.7-3.3-1.1-6.7-1.1-10.3 0-12.1 4.3-22.7 12.9-31.9 8.6-9.1 19.8-15 33.6-17.7V14.2c0-1.1.4-2.1 1.3-3 .8-.8 1.8-1.3 3-1.3h17.8c1.2 0 2.2.4 3 1.2.8.8 1.2 1.8 1.2 3v23.2c5 .5 9.9 1.5 14.5 3s8.5 3 11.5 4.4c2.9 1.4 5.7 3.1 8.4 4.9 2.6 1.9 4.3 3.1 5.1 3.8.8.7 1.4 1.3 2 1.9 1.5 1.6 1.7 3.3.7 5L174 79.5c-.7 1.3-1.7 2-3 2.1-1.2.3-2.4 0-3.6-.9-.3-.3-.9-.8-1.9-1.6s-2.7-2-5.1-3.5c-2.4-1.5-5-2.9-7.7-4.2s-6-2.4-9.8-3.4c-3.8-1-7.6-1.5-11.3-1.5-8.3 0-15.1 1.9-20.4 5.7S103 81 103 86.9c0 2.3.4 4.4 1.1 6.3.7 1.9 2 3.8 3.9 5.5 1.9 1.7 3.6 3.2 5.2 4.3 1.6 1.2 4.1 2.6 7.4 4.1 3.3 1.5 5.9 2.7 8 3.6 2 .8 5.1 2 9.2 3.6 4.6 1.8 8.2 3.1 10.7 4.1 2.5 1 5.8 2.6 10 4.6 4.2 2.1 7.5 3.9 9.9 5.6 2.4 1.7 5.1 3.9 8.2 6.6 3 2.7 5.3 5.5 7 8.4 1.6 2.8 3 6.2 4.1 10.1 1.2 3.9 1.7 8 1.7 12.4z"/>
                                        </svg>
                                        {secondsToHMS(timesheet.duration)}
                                    </div>
                                    <div className={s.table_row_cell}>
                                        {timestampToHHMM(timesheet.begin)} - {timestampToHHMM(timesheet.end)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default Work;
