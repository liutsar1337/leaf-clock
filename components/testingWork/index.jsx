import React, { useState, useEffect } from 'react';
import { Api } from "../../services";
import s from './s.module.scss';
import timestamp from "../../utils/timestamp";
import secondsToHMS from "../../utils/formatSecondsToMainTimer";

function TestingWork() {
    const [activities, setActivities] = useState([]);
    const [projects, setProjects] = useState([]);
    const [timesheets, setTimesheets] = useState([]);
    const [startTime, setStartTime] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const [timeNow, setTimeNow] = useState(0);
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
                billable: true,
                exported: true,
                project: 1,
                activity: 1,
                begin: timestamp(startTime),
                end: timestamp(new Date()),
                description: 'Test new'
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
        setTimeNow(0);
    };

    useEffect(() => {
        getActivities();
        getProjects();
        getTimesheets();
    }, []);

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

        // Cleanup the interval on component unmount or when isActive becomes false
        return () => clearInterval(interval);
    }, [isActive]); // The effect now depends on the isActive state

    return (
        <div className={s.layout}>
            <div>
                <br/>
                <br/>
                <h1>Get All Activities</h1>
                {activities.map((activity) => (
                    <div key={activity.id}>
                        <p>{activity.name}</p>
                    </div>
                ))}
                <br/>
                <br/>
                <h1>Get All Projects</h1>
                {projects.map((project) => (
                    <div key={project.id}>
                        <p>{project.name}</p>
                    </div>
                ))}
                <h1>Timeshets</h1>
                {timesheets.map((timesheet) => (
                    <div key={timesheet.id} className={s.layout}>
                        <p>duration: {timesheet.duration}</p>
                        <p>{timesheet.description}</p>
                    </div>
                ))}
            </div>
            <div>
                <br/>
                <br/>
                <h1>Create new Activity</h1>
                <button onClick={createActivity}>Create</button>
                <br/>
                <br/>
                <h1>Create new Project</h1>
                <button onClick={createProject}>Create</button>
                <br/>
                <br/>
                <h1 >Create new Timesheet</h1>
                <div className={s.layout}>
                    {isActive ?
                        <button onClick={timerStop}>stop</button>
                        :
                        <button onClick={timerStart}>start</button>}
                    <b>{secondsToHMS(timeNow)}</b>
                </div>

            </div>
        </div>
    )
}
export default TestingWork;
