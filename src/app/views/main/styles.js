import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => (
    {
        map_link: {
          
            border: "2px solid " + theme.palette.primary.main,
            "&:hover": {
                backgroundColor: theme.palette.primary.main + " !important",
            }
        },
        thumbnail: {
            color: theme.palette.primary.main + " !important",
        },
        app_title: {
            position: "absolute",
            left: "60px"
        },
        login_text: {
            position: "absolute",
            right: "60px"
        },
        util_icon: {
            borderRadius: "50%",
            border: "2px solid " + theme.palette.primary.main,
            filter: "alpha(opacity = 50)",

            "&:hover": {
                filter: "alpha(opacity = 100)",
            }
        },
        paper: {
            width: 'auto',
            marginTop: theme.spacing(3),
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
            alignItems: 'center',
        },
        ul_none_style: {
            listStyle: "none",
            padding: 0
        },
        button: {
            color: "white",
            "&:hover": {
                backgroundColor: theme.palette.primary.dark + " !important",
            }
        },
        chip: {
            color: "white !important"
        },
        homeIcon: {
            maxWidth: "25px",
            maxheight: "35px"
        },
        appbar: {
            borderBottom: "1px solid " + theme.palette.primary.main,
            borderColor: "skyblue",
            backgroundColor: "#303030"
        },
        personlLogoBtn: {
            cursor: "pointer",
            position: "absolute",
            padding: "6px",
            top: "0px",
            left: "0px",
            zIndex: "999"
        },
        loginBtn: {
            position: "absolute",
            
            top: "15px",
            right: "20px",
            zIndex: "999"
        },
        underline: {
            borderBottom: "1px solid " + theme.palette.primary.main,
        },
        tab: {
            flexGrow: 1,
        },
        link: {
            cursor: "pointer"
        },
        imgIcon: {
            width: "100px",
            height: "100px",
        },
        displayIcon: {
            fontSize: "60px",
        },
        iconInlineAlign: {
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
        },
        iconInline: {
            "fontSize": "50px",
        },
        iconPadding: {
            "paddingRight": "10px"
        },
        weatherIcon: {
            width: "100px",
            height: "100px",
            backgroundColor: "skyBlue"
        },
        technologyImg: {
            maxHeight: "50px",
            cursor: "pointer",
            maxWidth: "200px"
        },
        center: {
            textAlign: "center"
        },
        loader: { 
            paddingTop: '30vh', 
            paddingBottom: '30vh'
        },
        profilePicture: {
            width: "200px !important",
            height: "200px !important"
        },
        flip_text: {
            direction: "rtl", 
            unicodeBidi: "bidi-override"
        }
    }
));

export default useStyles;
