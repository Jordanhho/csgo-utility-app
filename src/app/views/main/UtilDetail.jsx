import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from "react-router-dom";

import ReactHtmlParser from 'react-html-parser';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Grid';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import ImageGallery from 'react-image-gallery';

import Loader from "Components/Loader";

import {
    getPublicUtilDetailApi
} from "Services/public_api";

import useStyles from "./styles";

function UtilDetail(props) {
    const { util_id } = useParams();
    const classes = useStyles();

    const readOnly = true;

    const [utilData, setData] = useState({});

    const [loaded, setLoaded] = useState(null);

    const fetchData = useCallback(async () => {
        const result = await getPublicUtilDetailApi({ util_id: util_id });

        //load map result
        if (result.data) {
            setData(result.data);
            setLoaded(true);
        }
        else {
            setLoaded(false);
        }
    }, [util_id]);

    useEffect(() => {
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

    function getGalleryArrObject(imgObj) {
      
        let newArr =[]
        newArr.push({
            original: imgObj.location,
            thumbnail: imgObj.location,
            thumbnailLabel: "Location",
            originalTitle: "Location",
            thumbnailClass: classes.thumbnail
        });
        newArr.push({
            original: imgObj.lineup,
            thumbnail: imgObj.lineup,
            thumbnailLabel: "Lineup",
            originalTitle: "Lineup",
            thumbnailClass: classes.thumbnail
        });
        newArr.push({
            original: imgObj.result,
            thumbnail: imgObj.result,
            thumbnailLabel: "Result",
            originalTitle: "Result",
            thumbnailClass: classes.thumbnail
        });
        return newArr;
    }
    return (
        <React.Fragment>
            <Grid item xs={12}>
                <Typography variant="h3" color="primary">
                    {utilData.utilDetail.util_name}
                </Typography>
            </Grid>
            <br/>
            <Box p={5} className={classes.center}>
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    direction="column"
                    spacing={3}
                >
                {(readOnly) &&
                    <React.Fragment>
                        <Grid item xs={12} align="center">
                            <div className={classes.iconInlineAlign}>
                                <span className={classes.iconPadding}>
                                    <img
                                        className={classes.iconInline}
                                        src={props.utilIcons[utilData.utilDetail.util_type]}
                                        alt="util type icon"
                                    />
                                </span>
                                <Typography variant="h4">
                                    {utilData.utilDetail.util_type}
                                </Typography>
                            </div>
                        </Grid>

                        <Grid item xs={12} align="center">
                            <Typography variant="body1">
                                {ReactHtmlParser(utilData.utilDetail.util_description)}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} align="center">
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={utilData.utilDetail.is_64_tick}
                                            name="is_64_tick"
                                            color="primary"
                                            disabled={readOnly}
                                        />
                                    }
                                    label="64 Tick"
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={utilData.utilDetail.is_128_tick}
                                            name="is_128_tick"
                                            color="primary"
                                            disabled={readOnly}
                                        />
                                    }
                                    label="128 Tick"
                                />
                            </FormGroup>
                        </Grid>
                    </React.Fragment>}
                </Grid>
                <Grid item xs={12} ref={props.scrollRef}>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={10}>
                            <Box p={3} className={classes.center}>
                                <ImageGallery
                                    items={getGalleryArrObject(utilData.images)}
                                    showPlayButton={false}
                                    showBullets={true}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    );
}
export default UtilDetail;