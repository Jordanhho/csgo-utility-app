import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import staticRoutes from "Routes/static_routes";

import useStyles from "./styles";
import useInput from "Custom_hooks/useInput";
import useInputPass from "Custom_hooks/useInputPass";

import {
    userSignUpApi
} from "Services/auth_api";

import ReCAPTCHA from "react-google-recaptcha";
import { getRecaptchaInvisiblePublicKey } from "Config/google_config";

function SiguUp() {
    const pageTitle = "Sign Up";
    const classes = useStyles();
    const recaptchaRef = React.createRef();
    const navigate = useNavigate();

    const [createAccErr, setCreateAccErr] = useState(false);
    const [confirmPasswordNotMatch, setConfirmPasswordNotMatch] = useState(false);

    const email = useInput('');
    const password = useInputPass('');
    const confirmPassword = useInputPass('');
    const firstname = useInput('');
    const lastname = useInput('');
    
    async function handleCreateAccount(e) {
        e.preventDefault();

        if(password.value !== confirmPassword.value) {
            setConfirmPasswordNotMatch(true);
            return;
        }

        setConfirmPasswordNotMatch(false);

        const recaptcha_token = await recaptchaRef.current.executeAsync();
        
        const postData = {
            recaptcha_token: recaptcha_token,
            email: email.value,
            password: password.value,
            firstname: firstname.value,
            lastname: lastname.value
        }
        const result = await userSignUpApi(postData);
        if (result.data && result.data.activation_email_sent) {
            setCreateAccErr(false);

            //redirect to activation page
            navigate(staticRoutes.member.login.activateAccountTemplate(email.value));
        }
        else {
            setCreateAccErr(true);
        }
    }

    useEffect(() => {
        document.title = pageTitle;
    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Paper elevation={3}>
                    <Container maxWidth="xs">
                        <Grid container justify="center">
                            <Typography component="h1" variant="h5">
                                Sign up
                            </Typography>
                            <form className={classes.form} onSubmit={handleCreateAccount}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="fname"
                                            name="firstname"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="firstname"
                                            label="First Name"
                                            autoFocus
                                            {...firstname}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="lastname"
                                            label="Last Name"
                                            name="lastname"
                                            autoComplete="lname"
                                            {...lastname}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            {...email}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                            {...password}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Confirm Password"
                                            type="password"
                                            id="confirmPassword"
                                            autoComplete="new-password"
                                            {...confirmPassword}
                                        />
                                    </Grid>
                                </Grid>

                                {createAccErr && <div className={classes.error_text}>{createAccErr}</div>}

                                {confirmPasswordNotMatch && <div className={classes.error_text}>{"Entered password does not match."}</div>}
          
                                <Grid container justify="center">
                                    <Grid item>
                                        <Link href={staticRoutes.member.login} variant="body2">
                                            Already have an account? Sign in
                                        </Link>
                                    </Grid>
                                </Grid>

                                <Grid container justify="center">
                                    <Grid item xs={6}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            onClick={handleCreateAccount}
                                        >
                                            Create
                                    </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Container>

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
export default SiguUp;