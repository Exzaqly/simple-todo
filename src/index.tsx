import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "./redux/store";
import "antd/dist/antd.css";
import {actions, addTask, Dispatch} from "./redux/tasksReducer";


const dispatch: Dispatch = store.dispatch

if (localStorage.getItem('tasks') !== "[]") {
    // @ts-ignore
    dispatch(actions.setInitialState(JSON.parse(localStorage.getItem('tasks'))))
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


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
