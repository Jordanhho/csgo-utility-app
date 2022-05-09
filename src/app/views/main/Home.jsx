import React, { useState, useEffect, useCallback } from 'react';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Grid';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Link from '@material-ui/core/Link';
import GitHubIcon from '@material-ui/icons/GitHub';
import IconButton from '@material-ui/core/IconButton';

import Loader from "Components/Loader";
import TitleBanner from "Components/TitleBanner";

import staticRoutes from "Routes/static_routes";

import UtilityAppImg from "Assets/img/utility_app_img.png";

import {
    getHomeApi
} from "Services/public_api";

import useStyles from "./styles";

function Home() {
    const pageTitle = staticRoutes.main.name;

    const xsSize = 12;
    const mdSize = 6;

    const classes = useStyles();

    const [homeData, setData] = useState([]);

    const [loaded, setLoaded] = useState(null);

    const fetchData = useCallback(async () => {
        const result = await getHomeApi();
        if(!result.error) {
            setData(result.data);
            setLoaded(true);
        }
        else {
            setLoaded(false);
        }
    }, []);
    
    useEffect(() => {
        document.title = pageTitle;
        fetchData();
    }, [fetchData, pageTitle]);

    if(loaded === null) {
        return (
            <Container>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    className={classes.loader}
                >
                    <Grid item xs={3}>
                        <Loader />
                    </Grid>
                </Grid>
            </Container>
        );
    }
    if (loaded === false) {
        return (
            <div>
                Error, something went wrong.
            </div>
        );
    }
    else {
        return (
            <Container>
                <TitleBanner title={"Csgo Utility App"}/>
                <Box p={2}>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        spacing={3}
                    >
                        <Grid item xs={xsSize} md={mdSize}>
                            <Paper className={classes.paper}>
                                <Box p={3} className={classes.center}>
                                    <Grid item xs={12}>
                                        <Typography variant="h4" color="primary">
                                            Welcome to the CSGO Utility App
                                        </Typography>
                                        <img
                                            src={UtilityAppImg}
                                            alt="csgo util app"
                                            className={classes.csgoAppLogo}
                                        />
                                    </Grid>
                                    <br />
                                    <Grid item xs={12}>
                                        <Typography variant="body1" gutterBottom>
                                            This project is to assist using csgo's utility by creating a library that can be used privately by teams or publicly viewed.
                                        </Typography>
                                    </Grid>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        spacing={3}
                    >
                        <Grid item xs={xsSize} md={mdSize}>
                            <Paper className={classes.paper}>
                                <Box p={3} className={classes.center}>
                                    <Grid item xs={12}>
                                        <Typography variant="h4" color="primary" className={classes.underline}>
                                            Live Demo for public
                                        </Typography>
                                    </Grid>
                                    <br />
                                    <br />
                                    <Grid item xs={12} align="center">
                                        <Typography variant="body1" gutterBottom>
                                            Currently supported maps include: 
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} align="center">
                                        <ul className={classes.ul_none_style}>
                                            {homeData.supported_maps.map((map_name, index) => (
                                                <li key={index}>
                                                    <Chip label={map_name} className={classes.chip} variant="outlined" color="primary" />
                                                </li>
                                            ))}
                                        </ul>
                                    </Grid>
                                    <br />
                                    <Grid item xs={12} align="center">
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            href={staticRoutes.main.maps.abs}
                                            className={classes.button}
                                        >
                                            View Maps
                                        </Button>
                                    </Grid>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        spacing={3}
                    >
                    <Grid item xs={xsSize} md={mdSize}>
                        <Paper className={classes.paper}>
                            <Box p={3} className={classes.center}>
                                <Grid item xs={12}>
                                    <Typography variant="h4" color="primary" className={classes.underline}>
                                        Github
                                    </Typography>
                                </Grid>
                                <br />
                                <Grid item xs={12}>

                                    <div className={classes.iconInlineAlign}>
                                        <span className={classes.iconPadding}>
                                            <IconButton
                                                color="primary"
                                                aria-label="Github"
                                                onClick={() => window.open(homeData.github_url)}
                                                className={classes.iconInline}
                                            >
                                                <GitHubIcon
                                                    fontSize="large"
                                                    color="primary"
                                                    className={classes.iconInline}
                                                />
                                            </IconButton>
                                        </span>

                                        <Typography variant="h6">
                                            <Link
                                                href="#"
                                                color="inherit"
                                                onClick={() => window.open(homeData.github_url)}
                                            >
                                                CSGO Utility App
                                            </Link>
                                        </Typography>
                                    </div>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                    </Grid>
                </Box>
            </Container>
        );
   }
}
export default Home;