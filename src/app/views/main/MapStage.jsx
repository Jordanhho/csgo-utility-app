import React from "react";
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import UtilRender from "./UtilRender";

import {
    getUtilIconScaledSize
} from "../../utility/map_scaling_utils";

const MapStage = (props) => {
    const [mapImage] = useImage(props.mapImage);

    const SMALL_MAP_WIDTH_PX = 650;
    const SMALL_MAP_HEIGHT_PX = 650;

    const scaledIconObj = getUtilIconScaledSize(SMALL_MAP_WIDTH_PX);

    return (
        <div>
            <Stage 
                width={SMALL_MAP_WIDTH_PX}
                height={SMALL_MAP_HEIGHT_PX}
                onMouseMove={props.onMouseMove}
            >
                <Layer>
                    <Image
                        image={mapImage}
                        width={SMALL_MAP_WIDTH_PX}
                        height={SMALL_MAP_HEIGHT_PX}
                    />
                    {props.utilData.map((utilDetails, index) => (
                        <UtilRender
                            key={index}
                            {...utilDetails}
                            utilIcons={props.utilIcons}
                            utilOnClick={props.utilOnClick}
                            utilWidth={scaledIconObj.width}
                            utilHeight={scaledIconObj.height}
                            mapStageSize={SMALL_MAP_WIDTH_PX}
                            activeHover={utilDetails.util_id === props.activeUtilId}
                        />
                    ))}
                </Layer>
            </Stage>
        </div>
    );
}

export default MapStage;
