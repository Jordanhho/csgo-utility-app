import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import store from "Redux/stores/index";
import App from "App/App";

import 'Assets/index.css';

render(
    <React.StrictMode>
         <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();