import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import PersonalLogo from "../../assets/img/personal_logo.png";

import staticRoutes from "../../routes/static_routes";

import useStyles from "./styles";
import StyledTab from "../../components/StyledTab";

import Home from "./Home";
import Maps from "./Maps";
import MapDetail from "./MapDetail";

function MainLayout() {
    const classes = useStyles();

    return (
        <div className={classes.root}>   
            <AppBar position="sticky" className={classes.appbar}>
                <Toolbar>
                    <Link to={staticRoutes.main.personal_website} className={classes.personlLogoBtn}>
                        <IconButton
                            aria-label="Home"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="primary"
                        >
                            <img
                                className={(classes.homeIcon)}
                                src={PersonalLogo}
                                alt="Personal Website"
                            />
                        </IconButton>
                    </Link>
                    <Typography variant="h6" color="primary" className={classes.app_title}>
                        Csgo Utility App
                    </Typography>
                    <Tabs
                        className={classes.tab}
                        value={false}
                        indicatorColor="secondary"
                        textColor="primary"
                        aria-label=""
                        centered
                    >
                        <StyledTab
                            to={staticRoutes.main.home}
                            value={staticRoutes.main.home}
                            component={Link}
                            label="Home"
                        />
                        <StyledTab
                            to={staticRoutes.main.maps}
                            value={staticRoutes.main.maps}
                            component={Link}
                            label="Maps"
                        />
                    </Tabs>
                        <Button
                            className={classes.loginBtn}
                            href={staticRoutes.member.login}
                            variant="outlined"
                            endIcon={<FontAwesomeIcon icon={["fas", "sign-in-alt"]} />}
                            color="primary"
                        >
                            Login
                        </Button>
                </Toolbar>
            </AppBar>

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