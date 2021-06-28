//to scale location of icons from 1000x1000 map size to whatever the screen size is

export const MAP_WIDTH_PX = 1000;
export const MAP_HEIGHT_PX = 1000;

export const UTIL_ICON_WIDTH_PX = 40;
export const UTIL_ICON_HEIGHT_PX = 40;

//note new_map_size_px will only be 1 number as map is square
export function getUtilScaledLocation(coord_x, coord_y, new_map_size_px) {

    //given say 100,100 map of 1000x1000, map it to NxN size
    let scale_multiplier = new_map_size_px / MAP_WIDTH_PX;

    let scaled_coord_x = Math.floor(coord_x * scale_multiplier);
    let scaled_coord_y = Math.floor(coord_y * scale_multiplier);

    return {
        coord_x: scaled_coord_x,
        coord_y: scaled_coord_y,
    }
}

export function getUtilIconScaledSize(new_map_size_px) {

    //given say 100,100 map of 1000x1000, map it to NxN size
    let scale_multiplier = new_map_size_px / MAP_WIDTH_PX;

    let scaled_util_icon_width = Math.floor(UTIL_ICON_WIDTH_PX * scale_multiplier);
    let scaled_util_icon_height = Math.floor(UTIL_ICON_HEIGHT_PX * scale_multiplier);

    return {
        width: scaled_util_icon_width,
        height: scaled_util_icon_height,
    }
}