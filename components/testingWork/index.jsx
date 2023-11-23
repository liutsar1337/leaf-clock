import React, {useEffect} from 'react';
import {Api} from "../../services";
import s from './s.module.scss';

function testingWork() {
    const greeting = 'Hello Function Component!';
    const [activities, setActivities] = React.useState([]);
    const [projects, setProjects] = React.useState([]);
    const [timesheets, setTimesheets] = React.useState([]);
    const api = Api();
    const getActivities = async () => {
        try {
            const response = await api.activities.getAll();
            setActivities(response.data);
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
    }

    const getTimesheets = async () => {
        try {
            const response = await api.timesheets.getAll();
            setTimesheets(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getActivities();
        getProjects();
        getTimesheets();
    }, []);
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
                <div key={timesheet.id}>
                    <p>{timesheet.id}</p>
                </div>
            ))}
        </div>
            <h1>Create activity</h1>
        </div>
    )
}

export default testingWork;