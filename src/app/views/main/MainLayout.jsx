import React from 'react';
import { Route, Switch } from 'react-router-dom';

import staticRoutes from "../../routes/static_routes";

import useStyles from "./styles";

import Home from "./Home";
import Maps from "./Maps";
import MapDetail from "./MapDetail";

import NavBar from "../../components/NavBar";

function MainLayout() {
    const classes = useStyles();

    const navList = [
        {
            to: staticRoutes.main.home,
            name: "Home"
        },
        {
            to: staticRoutes.main.maps,
            name: "Maps"
        }
    ];

    return (
        <div className={classes.root}>   
            <NavBar
                navList={navList}
                personal_website={staticRoutes.main.home}
                login={staticRoutes.member.login}
            />
            <Switch>
                <Route
                    exact path={staticRoutes.main.home}
                    component={Home}
                />
                <Route
                    path={staticRoutes.main.maps}
                    component={Maps}
                />
                <Route
                    path={staticRoutes.main.mapWithUtils}
                    component={MapDetail}
                />
            </Switch>
        </div>
    )
}
export default MainLayout;