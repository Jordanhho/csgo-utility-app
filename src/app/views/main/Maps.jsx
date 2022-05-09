import React, { useState, useEffect, useCallback } from 'react';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Grid';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';

import TitleBanner from "Components/TitleBanner";
import Loader from "Components/Loader";

import staticRoutes from "Routes/static_routes";

import {
    getMapsApi
} from "Services/public_api";

import useStyles from "./styles";

function Maps() {
    const pageTitle = "Maps";

    const classes = useStyles();

    const xsSize = 12;
    const mdSize = 6;

    const [mapsData, setData] = useState([]);

    const [loaded, setLoaded] = useState(null);

    const fetchData = useCallback(async () => {
        const result = await getMapsApi();
        if (result.error) {
            setLoaded(false);
        }
        else {
            setData(result.data);
            setLoaded(true);
        }
    }, []);

    useEffect(() => {
        document.title = pageTitle;
        fetchData();
    }, [fetchData]);

    if (loaded === null) {
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

    return (
        <Container>
            <TitleBanner title={"Maps"} />
            <Box p={2}>
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    spacing={3}
                    direction="column"
                >

                    <Grid item xs={xsSize} md={mdSize}>
                        <Paper className={classes.paper}>
                            <Box p={3} className={classes.center}>
                                <Grid item xs={12}>
                                    <Typography variant="h4" color="primary">
                                        Note!
                                    </Typography>
                                </Grid>
                                <br />
                                <Grid item xs={12}>
                                    <Typography variant="body1" gutterBottom>
                                        Currently, the demo only supports the Dust 2 Map.
                                    </Typography>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={xsSize} md={mdSize}>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                        >
                            {mapsData.maps.map((mapDetails, index) => (
                                <Paper className={classes.paper} key={index}>
                                    <Box p={3} className={classes.center}>
                                        <Grid item xs={12}>
                                            <Typography variant="h4" color="primary">
                                                {mapDetails.map_name}
                                            </Typography>
                                            <Button href={staticRoutes.main.mapTemplate(mapDetails.map_id)} className={classes.map_link} key={`map-link-${index}`}>
                                                <img
                                                    src={mapDetails.cloudfront_map_url}
                                                    className={classes.displayMapSize}
                                               
                                                    alt={mapDetails.map_name}
                                                />
                                            </Button>
                                        </Grid>
                                    </Box>
                                </Paper>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
export default Maps;