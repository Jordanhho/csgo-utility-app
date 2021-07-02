import React from "react";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function Copyright() {
    return (
        <Box p={2}>
            <Typography variant="body2" color="textSecondary" align="center">
                Copyright © 2021 Jordan Ho. Powered by Node & React 2021.
            </Typography>
        </Box>
    );
}
export default Copyright;