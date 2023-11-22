import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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

const router = createBrowserRouter([
    { path: '/', element: <MainScreen/>},
    { path: '/login', element: <Login/> },
    { path: '/landing', element: <LandingPage/>},
    { path: '/register', element: <Register/>},
    { path: '/profile', element: <Profile/>},
    { path: '/work', element: <Work/>},
])

const root = createRoot(document.body);

// Wrap your application with PersistGate
const persistor = persistStore(store);

root.render(
    <React.StrictMode>
        <CookiesProvider>
            <Provider store={store}>
                {/*<PersistGate loading={<Loading/>} persistor={persistor}>*/}
                    <TopBar/>
                    <RouterProvider router={router} />
                {/*</PersistGate>*/}
            </Provider>
        </CookiesProvider>
    </React.StrictMode>
)
