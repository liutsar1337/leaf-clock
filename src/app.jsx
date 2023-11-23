import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainScreen from '../components/MainScreen';
import Loading from '../components/Loading';
import { persistStore } from 'redux-persist'; // Import persistStore
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { Provider } from 'react-redux';
import {store} from '../redux/store';
import Login from '../components/Login';
import Register from '../components/Register';
import { CookiesProvider } from 'react-cookie';
import Profile from "../components/Profile";
import TopBar from "../components/TopBar";
import Work from '../components/Work';
import LandingPage from "../components/LandingPage";
import TestingWork from "../components/testingWork";


const root = createRoot(document.body);

// Wrap your application with PersistGate
const persistor = persistStore(store);

root.render(
    <React.StrictMode>
        <CookiesProvider>
            <Provider store={store}>
                {/*<PersistGate loading={<Loading/>} persistor={persistor}>*/}
                    <Router>
                        <TopBar/>
                        <Routes>
                            <Route path="/" element={<MainScreen />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/landing" element={<LandingPage />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/work" element={<Work />} />
                            <Route path="/testingwork" element={<TestingWork />} />                        </Routes>
                    </Router>
                {/*</PersistGate>*/}
            </Provider>
        </CookiesProvider>
    </React.StrictMode>
)
