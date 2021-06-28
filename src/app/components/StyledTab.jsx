import React from "react"

import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';

const StyledTab = withStyles((theme) => ({
    root: {
        wordWrap: "break-word",
        minWidth: "100px",
        maxWidth: "140px",
        textTransform: 'none',
        color: '#fff',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        filter: "brightness(90%)",
        '&:focus': {
            opacity: 1,
        },
        '&:hover': {
            filter: "brightness(100%)"
        },
    },
}))((props) => <Tab disableRipple {...props} />);

export default StyledTab;