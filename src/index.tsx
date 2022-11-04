import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "./redux/store";
import 'antd/dist/antd.min.css'
import {actions, Dispatch} from "./redux/tasksReducer";

const dispatch = store.dispatch
const tasks = localStorage.getItem('tasks');
if (tasks && tasks !== "[]") {
    dispatch(actions.setInitialState(JSON.parse(tasks)))
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
