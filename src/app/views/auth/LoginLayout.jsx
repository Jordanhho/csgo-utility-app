import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import Login from "Auth_view/Login";
import SignUp from "Auth_view/SignUp";
import ActivateAccount from "Auth_view/ActivateAccount";
import ChangePassword from "Auth_view/ChangePassword";

import staticRoutes from "Routes/static_routes";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        borderRadius: 0
    },
}));

function LoginLayout() {
    const classes = useStyles();
    const authObj = useSelector(state => state.auth);

    const currPaths = staticRoutes.member.login;
    const navList = [
        {
            to: currPaths.abs,
            path: currPaths.relLink,
            name: currPaths.name,
            element: (
                <Login />
            )
        },
        {
            to: currPaths.activateAccount.abs,
            path: currPaths.activateAccount.relLink,
            name: currPaths.activateAccount.name,
            element: (
                <ActivateAccount />
            )
        },
        {
            to: currPaths.signUp.abs,
            path: currPaths.signUp.relLink,
            name: currPaths.signUp.name,
            element: (
                <SignUp />
            )
        },
        {
            to: currPaths.forgotPassword.abs,
            path: currPaths.forgotPassword.relLink,
            name: currPaths.forgotPassword.name,
            element: (
                <ChangePassword />
            )
        },
    ];

    if (authObj.isAuthenticated) {
        return (<Navigate to={staticRoutes.main.abs} />) ;
    }

    return (
        <div>
            <Button 
                href={staticRoutes.main.abs}
                color="primary"
                disableElevation
                startIcon={<ArrowBackIosIcon />}
                className={classes.button}
            >
                Back Home
            </Button>
            <Routes>
                {navList.map((nav, index) => {
                    return (
                        <Route
                            key={`login-route-${index}`}
                            path={nav.path}
                            element={nav.element}
                        />
                    )
                })}
            </Routes>
        </div>
    );
}

export default LoginLayout;