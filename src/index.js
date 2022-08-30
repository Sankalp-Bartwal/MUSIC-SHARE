import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {configureStore} from "@reduxjs/toolkit"
import {Provider} from "react-redux"
import { profileReducer, exploreReducer, recommendReducer } from './reducers/musicReducers';

const store = configureStore({
    reducer: {
        user: profileReducer,
        genre: exploreReducer,
        recommended: recommendReducer
    }
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store} >
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);
