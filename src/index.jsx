import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { persistStore } from 'redux-persist'; // Import persistStore
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import {store} from '../redux/store';
import { CookiesProvider } from 'react-cookie';

// Wrap your application with PersistGate
const persistor = persistStore(store);

import App from "./app";

const root = createRoot(document.body);

root.render(
    <React.StrictMode>
        <CookiesProvider>
            <Provider store={store}>
                {/*<PersistGate loading={<Loading/>} persistor={persistor}>*/}
                     <App/>
                {/*</PersistGate>*/}
            </Provider>
        </CookiesProvider>
    </React.StrictMode>
)
