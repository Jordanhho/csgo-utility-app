import React from 'react';
import { Route, Routes } from 'react-router-dom';

import staticRoutes from "Routes/static_routes";

import useStyles from "./styles";

import Home from "Main_view/Home";
import Maps from "Main_view/Maps";
import MapDetail from "Main_view/MapDetail";

import NavBar from "Components/NavBar";

function MainLayout() {
    const classes = useStyles();
    
    const currPaths = staticRoutes.main;

    const navList = [
        {
            to: currPaths.abs,
            path: currPaths.relLink,
            name: currPaths.name,
            element: (
                <Home />
            )
        },
        {
            to: currPaths.maps.abs,
            path: currPaths.maps.relLink,
            name: currPaths.maps.name,
            element: (
                <Maps />
            )
        },
    ];

    return (
        <div className={classes.root}>   
            <NavBar
                navList={navList}
                personal_website={staticRoutes.main.relLink}
                login={staticRoutes.member.login.abs}
            />
            <Routes>
                {navList.map((nav, index) => {
                    return (
                        <Route
                            key={`main-route-${index}`}
                            path={nav.path}
                            element={nav.element}
                        />
                    )
                })}
                <Route
                    path={currPaths.mapDetail.relLink}
                    element={<MapDetail/>}
                />
            </Routes>
        </div>
    )
}
export default MainLayout;