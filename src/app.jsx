import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainScreen from '../components/MainScreen';
import { Provider } from 'react-redux';
import store from '../redux/store';

const router = createBrowserRouter([
    { path: '/', element: <MainScreen/>}
])

const root = createRoot(document.body);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
)