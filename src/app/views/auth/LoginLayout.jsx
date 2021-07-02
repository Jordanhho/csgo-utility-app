import React from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import Login from "./Login";
import SignUp from "./SignUp";
import ActivateAccount from "./ActivateAccount";

import ChangePassword from "./ChangePassword";

import staticRoutes from "../../routes/static_routes";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        borderRadius: 0
    },
}));


function LoginLayout() {
    const classes = useStyles();
    const authObj = useSelector(state => state.auth);
    return (
        <div>
            <Button 
                href={staticRoutes.main.home}
                color="primary"
                disableElevation
                startIcon={<ArrowBackIosIcon />}
                className={classes.button}
            >
                Back Home
            </Button>
            <Switch>
                {(authObj.isAuthenticated) && (
                    <Redirect to={staticRoutes.main.home} />
                )}
                <Route
                    path={staticRoutes.member.activateAccount}
                    component={ActivateAccount}
                />
                <Route
                    path={staticRoutes.member.signUp}
                    component={SignUp}
                />
                <Route
                    path={staticRoutes.member.forgotPassword}
                    component={ChangePassword}
                />
                <Route
                    path={staticRoutes.member.login}
                    component={Login}
                />   
            </Switch>
        </div>
    );
}

export default LoginLayout;