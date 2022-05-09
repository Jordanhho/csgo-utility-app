import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';

import {
    userLoginSuccess
} from "Redux/actions/authActions";
import {
    userLogoutAsync
} from "Redux/asyncActions/authAsyncActions";

import moment from 'moment';

import Container from '@material-ui/core/Grid';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import staticRoutes from "Routes/static_routes";

import Copyright from "Components/Copyright";
import Loader from "Components/Loader";

import MainLayout from "Main_view/MainLayout";
import LoginLayout from "Auth_view/LoginLayout";

import NotFound from "Views/NotFound";

import {
    verifyLoginSessionApi,
    setAccessTokenApi
} from 'Services/auth_api';

import useStyles from "Views/main/styles";

function AppLayout() {

    const classes = useStyles();
    const navigate = useNavigate();
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
            // navigate(staticRoutes.main.abs);
        }
    }, [authObj, navigate, sessionTimeoutTimer, setAccessToken, verifyLogin]);

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
            <Routes>
                <Route
                    path={staticRoutes.member.login.layoutLink}
                    element={<LoginLayout />}
                />
                <Route
                    path={staticRoutes.main.layoutLink}
                    element={<MainLayout />}
                />
                <Route element={<NotFound />} />
            </Routes>

            <Box mt={8}>
                <Copyright />
            </Box>
        </div>
    )
}

export default AppLayout;