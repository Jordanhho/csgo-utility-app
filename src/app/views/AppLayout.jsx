import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';

import {
    userLoginSuccess
} from "../redux/actions/authActions";

import {
    userLogoutAsync
} from "../redux/asyncActions/authAsyncActions";

import moment from 'moment';
import Container from '@material-ui/core/Grid';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import staticRoutes from "../routes/static_routes";
import Copyright from "../components/Copyright";
import Loader from "../components/Loader";
import MainLayout from "./main/MainLayout";
import LoginLayout from "./auth/LoginLayout";

import NotFound from "./NotFound";

import {
    verifyLoginSessionApi,
    setAccessTokenApi
} from '../services/auth_api';

import useStyles from "./main/styles";

function AppLayout() {

    const classes = useStyles();
    const history = useHistory();
    const [loaded, setLoaded] = useState(null);
    const dispatch = useDispatch();
    const authObj = useSelector(state => state.auth);

    const setAccessToken = useCallback(async () => {
        await setAccessTokenApi(authObj.accessToken);
    }, [authObj]);


    const verifyLogin = useCallback(async () => {
        const result = await verifyLoginSessionApi();
        if (!result.error) {
            await dispatch(userLoginSuccess(result.data));
            setLoaded(true);
        }
        else {
            setLoaded(true);
        }
    }, [dispatch]);
    

    const sessionTimeoutTimer = useCallback(async () => {
        const verifyLoginSessionTimeOutTimer = setTimeout(async () => {
            const result = await verifyLoginSessionApi();
            if (result.error) {
                dispatch(userLogoutAsync());
            }
            setLoaded(true);
        }, moment(authObj.MainLayoutexpiredAt).diff() - 10 * 200);
        return () => {
            clearTimeout(verifyLoginSessionTimeOutTimer);
        }
    }, [authObj, dispatch]);

    useEffect(() => {
        if(!authObj.isAuthenticated) {
            //first time check if logged in
            verifyLogin();
        }
        else {
            //set session timeout checker
            sessionTimeoutTimer();

            setAccessToken(authObj.accessToken);

            //redirect to whereever you are currently at 

            // //redirect to home page
            // history.push(staticRoutes.main.home);
        }
    }, [authObj, history, sessionTimeoutTimer, setAccessToken, verifyLogin]);

    if (loaded === null) {
        return (
            <Container>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    className={classes.loader}
                >
                    <Grid item xs={3}>
                        <Loader />
                    </Grid>
                </Grid>
            </Container>
        );
    }
    if (loaded === false) {
        return (
            <div>
                Error, something went wrong.
            </div>
        );
    }


    return (
        <div>
            <Switch>
                <Route
                    path={staticRoutes.member.login}
                    component={LoginLayout}
                />
                <Route
                    path={staticRoutes.main.home}
                    component={MainLayout}
                />
                <Route component={NotFound} />
            </Switch>

            <Box mt={8}>
                <Copyright />
            </Box>
        </div>
    )
}

export default AppLayout;