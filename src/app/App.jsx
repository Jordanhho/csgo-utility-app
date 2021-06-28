import React from 'react';
import { CookiesProvider } from "react-cookie";

import theme from './theme/theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import {
    Route,
    BrowserRouter
} from "react-router-dom";

import CssBaseline from '@material-ui/core/CssBaseline';

import AppLayout from "./views/AppLayout";

//for react image gallery
import "react-image-gallery/styles/css/image-gallery.css";

//add font awesome icon library
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fab); 
library.add(fas);

function App() {
    return (
        <CookiesProvider>
            <BrowserRouter>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Route path="/" component={AppLayout} />
                </MuiThemeProvider>
            </BrowserRouter>
        </CookiesProvider>
    )
}
export default App;