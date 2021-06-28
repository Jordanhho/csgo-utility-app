import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Box from '@material-ui/core/Box';

import staticRoutes from "../routes/static_routes";

import Copyright from "../components/Copyright";

import MainLayout from "./main/MainLayout";
import LoginLayout from "./auth/LoginLayout";

import NotFound from "./NotFound";

function AppLayout() {
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