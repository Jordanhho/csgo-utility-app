import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

import PersonalLogo from "Assets/img/personal_logo.png";

import { useSelector, useDispatch } from 'react-redux';

import StyledTab from "./StyledTab";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    userLogoutAsync
} from "Redux/asyncActions/authAsyncActions";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    personlLogoBtn: {
        cursor: "pointer",
        position: "absolute",
        padding: "6px",
        top: "0px",
        left: "0px",
        zIndex: "999"
    },
    loginBtn: {
        position: "absolute",
        top: "10px",
        right: "15px",
        zIndex: "999"
    },
    noLink: {
        textDecoration: "None",
    },
    fullList: {
        width: 'auto',
    },
    listNavItem: {
        color: "white"
    },
    selectedListNavItem: {
        color: theme.palette.primary.main,
        border: "1px solid " + theme.palette.primary.main,
    },
    settingsBtn: {
        position: "absolute",
        padding: "5px",
        top: "0px",
        right: "0px",
        zIndex: "999"
    },
    appbar: {
        borderBottom: "1px solid " + theme.palette.primary.main,
        backgroundColor: "#303030 !important"
    },
    locationLabel: {
        margin: "auto",
        [theme.breakpoints.up('md')]: { //hide location label if screen is above xs
            display: 'none',
        },
        color: "white"
    },
    mobileMenu: {
        display: "inherit",
        zIndex: "999",
        position: "absolute",
        left: "50px"
    },
    menuButton: {
        left: "5px",
        [theme.breakpoints.up('md')]: { //hide menu icon if screen is above xs
            display: 'none',
        },
    },
    tabs: {
        flexGrow: 1,
        [theme.breakpoints.down('sm')]: { //hide tabs if below md
            display: 'none',
        },
    },
    homeIcon: {
        zIndex: "999",
        maxWidth: "25px",
        maxheight: "35px"
    },
    logoutBtn: {
        zIndex: "999",
        position: "absolute",
        padding: "6px",
        top: "0px",
        right: "0px",
    },
    username: {
        zIndex: "999",
        margin: "auto",
        color: "white",
        [theme.breakpoints.down('sm')]: { //hide username if below md
            display: 'none',
        },
    },
    usernameMenu: {
        [theme.breakpoints.up('md')]: { //hide username if below md
            display: 'none',
        },
    },
    loggedInDiv: {
        zIndex: "999",
        position: "absolute",
        right: "15px",
        top: "0px",
        padding: "7px",
        display: "inherit"
    },
}));

function NavBar(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const authObj = useSelector(state => state.auth);
    const [toggleNav, setToggleNav] = useState(false)

    const [anchorEl, setAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setToggleNav(open);
    };

    function getSelectedClass(currVal) {
        if (props.location === currVal) {
            return classes.selectedListNavItem
        }
        else {
            return classes.listNavItem
        }
    }

    const handleLogout = () => {
        dispatch(userLogoutAsync());
        handleMenuClose();
    }
    
    const list = (anchor) => (
        <div
            className={classes.fullList}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            {props.navList.map((navItem, index) => (
                <Link to={navItem.to} key={index} className={classes.noLink}>
                    <ListItem button className={getSelectedClass(navItem.to)}>
                        <ListItemText primary={navItem.name} />
                    </ListItem>
                </Link>
            ))}
        </div>
    );

    function renderMenu() {
        return (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}

                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem>
                    <Typography variant="inherit" noWrap className={classes.usernameMenu}>
                        Logged in as {authObj.user.firstname + " " + authObj.user.lastname}
                    </Typography>
                </MenuItem>

                <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                        <AccountBoxIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit" noWrap>
                        My Account
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <ExitToAppIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit" noWrap>
                        Logout
                    </Typography>
                </MenuItem>
            </Menu>
        )
    }

    return (
        <React.Fragment>
            <AppBar position="sticky" className={classes.appbar}>
                <Toolbar>
                    <Link to={props.personal_website} className={classes.personlLogoBtn}>
                        <IconButton
                            aria-label="Home"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="primary"
                        >
                            <img
                                className={(classes.homeIcon)}
                                src={PersonalLogo}
                                alt="Jordan Logo"
                            />
                        </IconButton>
                    </Link>
                    <div className={classes.mobileMenu}>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon color="primary" />
                        </IconButton>
                    </div>

                    <Tabs
                        className={classes.tabs}
                        value={props.location || false}
                        indicatorColor="secondary"
                        textColor="primary"
                        aria-label=""
                        centered
                    >
                        {(props.navList.map((navItem, index) => (
                            <StyledTab
                                key={index}
                                to={navItem.to}
                                value={navItem.to}
                                component={Link}
                                label={navItem.name}
                            />
                        )))}
                    </Tabs>

                    {authObj.isAuthenticated && (
                        <div className={classes.loggedInDiv}>
                            <Typography variant="h5" className={classes.username}>
                                {authObj.user.firstname + " " + authObj.user.lastname}
                            </Typography>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"

                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle color="primary" />
                            </IconButton>
                        </div>
                    )}
                    {(!authObj.isAuthenticated && props.login) && (
                       <Button
                            className={classes.loginBtn}
                            href={props.login}
                            variant="outlined"
                            endIcon={<FontAwesomeIcon icon={["fas", "sign-in-alt"]} />}
                            color="primary"
                        >
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            {(authObj.isAuthenticated) && (
                renderMenu()
            )}
            <SwipeableDrawer
                anchor={"top"}
                open={toggleNav}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {list("top")}
            </SwipeableDrawer>
        </React.Fragment>
    )
}

export default NavBar;