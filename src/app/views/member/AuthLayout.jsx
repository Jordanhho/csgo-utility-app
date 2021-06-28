import React, { useEffect } from 'react';

import { Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// import PrivateRoute from "../../routes/PrivateRoute";
// import PublicRoute from "../../routes/PublicRoute";

// import MemberLayout from "./MemberLayout";
import LoginLayout from "../auth/LoginLayout";

import staticRoutes from "../../routes/static_routes";

import { 
    verifyLoginSessionAsync
} from '../../redux/asyncActions/authAsyncActions';

function AuthLayout() {

    const authObj = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const { authLoading, isAuthenticated } = authObj;

    // verify accessToken on app load
    useEffect(() => {
        dispatch(verifyLoginSessionAsync());
    }, [dispatch]);

    //checking authentication
    if (authLoading) {
        return <div className="content">Checking Authentication...</div>
    }
    
    return (
        <div>
            <Switch>
                <PublicRoute 
                    path={staticRoutes.member.login}
                    component={LoginLayout}
                    isAuthenticated={isAuthenticated} 
                />
                {/* <PrivateRoute 
                    path={staticRoutes.member.home}
                    component={MemberLayout}
                    isAuthenticated={isAuthenticated} 
                />  */}
                <Redirect to={isAuthenticated 
                    ? staticRoutes.main.home 
                    : staticRoutes.member.login
                }/> 
            </Switch>
        </div>
    )
}

export default AuthLayout;