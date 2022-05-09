import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Route, Routes  } from "react-router-dom";

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Grid';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import UtilDetail from "Main_view/UtilDetail";
import MapStage from "Main_view/MapStage";

import Loader from "Components/Loader";
import TitleBanner from "Components/TitleBanner";

import staticRoutes from "Routes/static_routes";

import {
    getPublicMapDetailApi
} from "Services/public_api";

import useStyles from "./styles";

function MapDetail() {
    const xsSize = 12;
    const mdSize = 10;

    const utilDetailRef = React.useRef(null)
    const { map_id, util_id } = useParams();
    const pageTitle = "Map " + map_id;
    const navigate = useNavigate();

    const classes = useStyles();
    const [mapDetail, setData] = useState({});
    const [loaded, setLoaded] = useState(null);

    async function handleUtilOnClick(util_id) {
        //cahnge to util id path
        navigate(staticRoutes.main.utilTemplate(map_id, util_id));

        //scroll to section
        utilDetailRef.current.scrollIntoView({ behavior: 'smooth', block: "end"});
    }

    function handleOnMouseMove(e) {
        // const stage = e.target.getStage();
        // const pointerPosition = stage.getPointerPosition();

        // //set offset
        // let coord_x = Math.floor(pointerPosition.x) + 2;
        // let coord_y = Math.floor(pointerPosition.y) + 1;

        // console.log("X: ", coord_x, " Y: ", coord_y)
    }

    const fetchData = useCallback(async () => {
        //get map data
        const mapResult = await getPublicMapDetailApi({map_id: map_id});

        //load map result
        if (mapResult.data) {
            setData(mapResult.data);
            setLoaded(true);
        }
        else {
            setLoaded(false);
        }
    }, [map_id,]);

    useEffect(() => {
        document.title = pageTitle;
        fetchData();
    }, [fetchData, pageTitle]);

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
            <TitleBanner title={mapDetail.map_name + " Utilities"} />
            <Grid
                container
                justify="center"
                alignItems="center"
                spacing={3}
                direction="column"
            >
                <Grid item xs={xsSize} md={mdSize}>
                    <Paper className={classes.paper}>
                        <Box p={5} className={classes.center}>
                            <Grid item xs={12}>
                                <MapStage
                                    stageWidth={1000}
                                    stageHeight={1000}
                                    mapImage={mapDetail.cloudfront_map_url}
                                    utilData={mapDetail.utilDetails}
                                    utilIcons={mapDetail.util_icons}
                                    utilOnClick={handleUtilOnClick}
                                    onMouseMove={handleOnMouseMove}
                                    activeUtilId={util_id}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="h6" color="primary">
                                    Click on a utility on the map for more details.
                                </Typography>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
            
            <Routes>
                <Route
                    path={staticRoutes.main.utilDetail.relLink}
                    element={
                        <Grid
                            container
                            justify="center"
                            alignItems="center"
                            spacing={6}
                        >
                            <Grid item xs={xsSize} md={mdSize}>
                                <Paper className={classes.paper} >
                                    <Box p={5} className={classes.center} ref={utilDetailRef}>
                                        <UtilDetail
                                            utilIcons={mapDetail.util_icons}
                                        />
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    }
                >
                </Route>
            </Routes>
        </Container>
    );
}
export default MapDetail;