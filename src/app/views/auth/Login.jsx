import React, { useState, useEffect, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

import Loader from "Components/Loader";

import staticRoutes from "Routes/static_routes";

import { userLoginAsync } from 'Redux/asyncActions/authAsyncActions';

import { 
    getLoginSettingsApi
} from "Services/public_api";

import useStyles from "./styles";
import useInput from "Custom_hooks/useInput";
import useInputPass from "Custom_hooks/useInputPass";

import ReCAPTCHA from "react-google-recaptcha";
import { getRecaptchaInvisiblePublicKey } from "Config/google_config";

function Login() {
    const pageTitle = staticRoutes.member.name;
    const classes = useStyles();
    const recaptchaRef = React.createRef();

    const [loginSettings, setData] = useState({
        enable_change_password: false,
        enable_new_accounts: false,
        enable_emailing: false
    });
    const [loaded, setLoaded] = useState(null);

    const authObj = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const { userLoginLoading, loginError } = authObj;

    const email = useInput('');
    const password = useInputPass('');

    // handle button click of login form
    const handleLogin = async  (e) => {
        e.preventDefault();
        const recaptcha_token = await recaptchaRef.current.executeAsync();
        let postData = {
            email: email.value,
            password: password.value,
            recaptcha_token: recaptcha_token
        }
        await dispatch(userLoginAsync(postData));
    }

    const fetchData = useCallback(async () => {
        const result = await getLoginSettingsApi();
        if (!result.error) {
            setData(result.data);
            setLoaded(true);
        }
        else {
            setLoaded(false);
        }
    }, []);

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
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Paper elevation={3}>
                    <Box p={5}>
                        <Grid container justify="center">
                            <Typography component="h1" variant="h5">
                                Member Login
                            </Typography>
                            <form onSubmit={handleLogin}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    {...email}
                                    inputProps={{
                                        tabIndex: "1"
                                    }}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    id="password"
                                    autoComplete="current-password"
                                    {...password}
                                    inputProps={{
                                        tabIndex: "2"
                                    }}
                                />
                                <br/>
                                <br />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    value={userLoginLoading ? 'Loading...' : 'Login'}
                                    onClick={handleLogin}
                                    tabIndex="3"
                                >
                                    Login
                                </Button>
                                {loginError && <div className={classes.error_text}>Something went wrong. Please try again later.</div>}
                            </form>
                            <br/>
                            <Grid container>
                               {(loginSettings.enable_change_password &&
                                    <Grid item xs>
                                        <Link
                                            href={staticRoutes.member.forgotPassword.abs}
                                            variant="body2"
                                            className={classes.link}
                                        >
                                            Forgot password?
                                    </Link>
                                    </Grid>
                                )}

                                {(loginSettings.enable_new_accounts &&
                                    <Grid item>
                                        <Link
                                            href={staticRoutes.member.signUp.abs}
                                            variant="body2"
                                            className={classes.link}
                                        >
                                            Sign Up
                                        </Link>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </div>
            <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey={getRecaptchaInvisiblePublicKey()}
            />
        </Container>
    );
}
export default Login;