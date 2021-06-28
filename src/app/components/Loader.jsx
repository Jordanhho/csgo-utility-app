import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';

function Loader(props) {
    if(!props.hide) {
        return (
            <CircularProgress color="primary" />
        );
    }
   
}
export default Loader;
