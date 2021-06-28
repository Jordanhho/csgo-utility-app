import React, { useState } from 'react';
import { Image } from "react-konva";
import useImage from 'use-image';

import {
    Circle,
    Line,
} from 'react-konva';

import {
    getUtilScaledLocation
} from "../../utility/map_scaling_utils";


import useStyles from "./styles";

const UtilRender = (props) => {

    const classes = useStyles();

    let [showTarget, setShowTarget] = useState(false);
    
    function handleOnHover(e, onImg) {
        setShowTarget(onImg);
        let container = e.target.getStage().container();
        if(onImg) {
            container.style.cursor = "pointer";
        }
        else {
            container.style.cursor = "default";
        }
    }

    function getUtilCoordOffsetX() {
        let offset = Math.floor(props.utilWidth / 2);
        return offset;
    }

    function getUtilCoordOffsetY() {
        let offset = Math.floor(props.utilHeight / 2);
        return offset;
    }

    const scaledUtilLocation = getUtilScaledLocation(props.init_coord_x, props.init_coord_y, props.mapStageSize);
    const scaledTargetLocation = getUtilScaledLocation(props.target_coord_x, props.target_coord_y, props.mapStageSize);

    const linePoint = [
        scaledUtilLocation.coord_x,
        scaledUtilLocation.coord_y,
        scaledTargetLocation.coord_x,
        scaledTargetLocation.coord_y
    ]
    const [utilImage] = useImage(props.utilIcons[props.util_type]);

    return (
        <React.Fragment>
            <Line
                visible={props.activeHover || showTarget}
                points={linePoint}
                closed
                stroke="lightGreen"
            />
            <Circle
                visible={props.activeHover || showTarget}
                x={scaledTargetLocation.coord_x}
                y={scaledTargetLocation.coord_y}
                radius={50}
                opacity={0.3}
                fill="aqua"
            />
            <Circle
                x={scaledUtilLocation.coord_x}
                y={scaledUtilLocation.coord_y}
                radius={props.utilWidth - 10}
                opacity={1.0}
                stroke={props.activeHover ? "aqua" : "yellow"}
            />
            <Image
                className={classes.util_icon}
                name={props.util_id}
                image={utilImage}
                x={scaledUtilLocation.coord_x}
                y={scaledUtilLocation.coord_y}
                offsetX={getUtilCoordOffsetX()}
                offsetY={getUtilCoordOffsetY()}
                width={props.utilWidth}
                height={props.utilHeight}
                onClick={() => { props.utilOnClick(props.util_id) }}
                onMouseEnter={(e) => { handleOnHover(e, true) }}
                onMouseLeave={(e) => { handleOnHover(e, false) }}
            />
        </React.Fragment>
    );
}

export default UtilRender;
