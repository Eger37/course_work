import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

import App from './app/';

ReactDOM.render(
    <React.StrictMode>
        {/*<BrowserRouter basename="/admin">*/}
            <App/>,
        {/*</BrowserRouter>*/}

    </React.StrictMode>,
    document.getElementById('root')
)