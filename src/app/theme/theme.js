import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            light: '#A7FFEB',
            main: '#1DE9B6',
            active: '#FF4081',
            dark: '#FF4081', 
            contrastText: '#000',
            
        },
        secondary: {
            light: '#FF80AB',
            main: '#FF4081',
            dark: '#F50057',
            contrastText: '#000',
        },
    },
    overrides: {
        MuiButton: {
            outlined: {
                "&:hover": {
                    backgroundColor: '#FF4081 !important',
                }
            },
        }, 
    },
});

export default theme;