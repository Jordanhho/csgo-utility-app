import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import staticRoutes from "Routes/static_routes";

import {
    activateAccountApi
} from "Services/auth_api";

import useStyles from "./styles";
import useInput from "Custom_hooks/useInput";

import ReCAPTCHA from "react-google-recaptcha";
import { getRecaptchaInvisiblePublicKey } from "Config/google_config";

function ActivateAccount() {
    const pageTitle = staticRoutes.member.login.activateAccount;
    const recaptchaRef = React.createRef();
    const classes = useStyles();

    const { email, activation_code } = useParams();

    const activation_code_input = useInput('');

    const [showActivationPage, setShowActivationPage] = useState(false);
    const [showActivationSuccess, setShowActivationSuccess] = useState(false);
    const [showActivationFailure, setShowActivationFailure] = useState(false);
    const [noCodeErr, setNoCodeErr] = useState(false);

    async function activateAccount() {
        //if params of activation_code and email exist, attempt to auto activate account
        if (email && activation_code) {

            const recaptcha_token = await recaptchaRef.current.executeAsync();

            const postData = {
                email: email,
                activation_code: activation_code,
                recaptcha_token: recaptcha_token
            }
            const result = await activateAccountApi(postData);

            //upon success show success screen
            if (result.data && result.data.activated_account) {
                setShowActivationSuccess(true);
            }
            //something went wrong, so just show invalid activation page
            else {
                setShowActivationFailure(true);
            }
            setShowActivationPage(false);
            return;
        }
        setShowActivationPage(true);
    }

    const loadActivationLink = useCallback(async () => {
        //if params of activation_code and email exist, attempt to auto activate account
        if (email && activation_code) {

            const recaptcha_token = await recaptchaRef.current.executeAsync();

            const postData = {
                email: email,
                activation_code: activation_code,
                recaptcha_token: recaptcha_token
            }
            const result = await activateAccountApi(postData);

            //upon success show success screen
            if (result.data && result.data.activated_account) {
                setShowActivationSuccess(true);
            }
            //something went wrong, so just show invalid activation page
            else {
                setShowActivationFailure(true);
            }
            setShowActivationPage(false);
            return;
        }
        setShowActivationPage(true);
    }, [email, activation_code, recaptchaRef]);

    //on page load
    useEffect(() => {
        document.title = pageTitle;
        loadActivationLink();
    }, [loadActivationLink, pageTitle]);

    async function handleActivateAccount(e) {
        e.preventDefault();

        if (!activation_code_input.value) {
            setNoCodeErr(true);
            return;
        }
        setNoCodeErr(false);

        const postData = {
            email: email,
            activation_code: activation_code_input.value
        }
        await activateAccount(postData);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Paper elevation={3}>
                    {(showActivationPage) &&
                        <Container maxWidth="xs">
                            <Grid container justify="center">
                    
                                <Typography component="h1" variant="h5">
                                    Activate Account
                                </Typography>
                
                                <Typography component="h3" >
                                    An email should have been sent to <b>{email}</b>.
                                    <br/>
                                    Please check your email for a message with your activation code code.
                                </Typography>

                                <form className={classes.form} onSubmit={handleActivateAccount}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="activation_code"
                                                label="Enter code"
                                                name="activation_code"
                                                {...activation_code_input}
                                                autoFocus
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container justify="center">
                                        <Grid item>
                                        {noCodeErr && <div className={classes.error_text}>Please enter the activation code.</div>}
                                        </Grid>
                                    </Grid>

                                    <Grid container justify="center">
                                        <Grid item>
                                        <Link href={staticRoutes.member.login.abs} variant="body2">
                                                Already have an account? Login here
                                            </Link>
                                        </Grid>
                                    </Grid>

                                    <Grid container justify="center" spacing={2}>
                                        <Grid item xs={6}>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                className={classes.submit}
                                                onClick={handleActivateAccount}
                                            >
                                                Activate
                                        </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Grid>
                        </Container>
                    }

                    {(showActivationSuccess) &&  
                        <Container maxWidth="xs">
                            <Grid container justify="center">
                                <Typography component="h1" variant="h6">
                                    Successfully activated account for {email}
                                </Typography>
                                <Grid container justify="center" spacing={2}>
                                    <Grid item xs={6} >
                                        <Button
                                            href={staticRoutes.member.login.abs}
                                            fullWidth
                                            color="primary"
                                            startIcon={<ArrowBackIosIcon />}
                                            className={classes.button}
                                        >
                                            Back to Login
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Container>
                    }

                    {(showActivationFailure) &&
                        <Container maxWidth="xs">
                            <Grid container justify="center">
                                <Typography component="h1" variant="h5">
                                    Account Activation Failed. 
                                </Typography>
                                <Typography component="h1" variant="h6">
                                The activation link may be invalid or expired.
                                </Typography>


                                <Grid container justify="center" spacing={2}>
                                    <Grid item xs={6} >
                                        <Button
                                            href={staticRoutes.member.login.abs}
                                            fullWidth
                                            color="primary"
                                            startIcon={<ArrowBackIosIcon />}
                                            className={classes.button}
                                        >
                                            Back to Login
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Container>
                    }

                    <ReCAPTCHA
                        ref={recaptchaRef}
                        size="invisible"
                        sitekey={getRecaptchaInvisiblePublicKey()}
                    />
                </Paper>
            </div>
        </Container>
    )
}
export default ActivateAccount;