import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import './css/index.css'
import './css/App.css'
import App from './App'
import {Provider} from 'react-redux'
import store from "./app/store/store";

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root'))
