import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import staticRoutes from "./static_routes";

// handle the private routes
function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => rest.isAuthenticated 
                ? <Component {...props} /> 
                : <Redirect to={{ pathname: staticRoutes.member.login, state: { from: props.location } }} />
            }
        /> 
    )
}

export default PrivateRoute;