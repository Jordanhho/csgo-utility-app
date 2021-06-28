import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import staticRoutes from "./static_routes";

// handle the public routes
function PublicRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => !rest.isAuthenticated 
                ? <Component {...props} /> 
                : <Redirect to={{ pathname: staticRoutes.member.home }} />
            }
        />
    )
}

export default PublicRoute;