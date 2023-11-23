import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainScreen from '../components/MainScreen';
import Login from '../components/Login';
import Register from '../components/Register';
import Profile from "../components/Profile";
import TopBar from "../components/TopBar";
import Work from '../components/Work';
import LandingPage from "../components/LandingPage";
import TestingWork from "../components/testingWork";
import {useSelector} from "react-redux";

const App = () => {
    const isAuth = Boolean(useSelector(state => state.auth.user))
    return (
                <Router>
                    <TopBar/>
                    <Routes>
                        <Route path="/" element={<MainScreen/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/landing" element={<LandingPage/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/profile" element={
                            isAuth ? <Profile/> : <Login/>
                        }/>
                        <Route path="/work" element={
                            isAuth ? <Work/> : <Login/>
                        }/>
                        <Route path="/testingwork" element={
                            isAuth ? <TestingWork/> : <Login/>
                        }/>
                    </Routes>
                </Router>
    )
};

export default App;