import React, { useState, useEffect } from "react";

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import ReCAPTCHA from "react-google-recaptcha";
import { 
    getRecaptchaInvisiblePublicKey
 } from "../../config/google_config";

import staticRoutes from "../../routes/static_routes";

import {
    sendResetPasswordEmailApi,
    verifyResetPasswordCodeApi,
    resetPasswordApi
} from "../../services/auth_api";

import useStyles from "./styles";
import useInput from "../../custom_hooks/useInput";
import useInputPass from "../../custom_hooks/useInputPass";

function ForgotPassword() {
    const pageTitle = "Change Password"
    const classes = useStyles();
    const recaptchaRef = React.createRef();

    const pageList = [
        "send_email",
        "verification_code",
        "reset_password",
        "password_changed"
    ]
    const [pageIndex, setPageIndex] = useState(0);

    const [sendEmailErr, setSendEmailErr] = useState(false);
    const [invalidVerificationCode, setInvalidVerificationCode] = useState(false);
    const [passwordChangeErr, setPasswordChangeErr] = useState(false);
    const [confirmPasswordNotMatch, setConfirmPasswordNotMatch] = useState(false);

    const email = useInput('');
    const verification_code = useInput('');
    const password = useInputPass('');
    const confirmPassword = useInputPass('');
    const [verification_token, setVerificationToken] = useState("");

    function incrementPage() {
        if(pageIndex < (pageList.length - 1)) {
            setPageIndex(pageIndex + 1);
        }
        clearErrors();
    }

    function decrementPage() {
        if (0 < pageIndex) {
            setPageIndex(pageIndex - 1);
        }
        clearErrors();
    }

    function clearErrors() {
        setSendEmailErr(false);
        setInvalidVerificationCode(false);
        setPasswordChangeErr(false);
        setConfirmPasswordNotMatch(false);
    }

    // handle button click of send email
    async function handleSendEmail(e) {
        e.preventDefault();
        const recaptcha_token = await recaptchaRef.current.executeAsync();
        const postData = {
            recaptcha_token: recaptcha_token,
            email: String(email.value)
        }
        const result = await sendResetPasswordEmailApi(postData);

        if(result.data.email_sent) {
            setSendEmailErr(false);
            incrementPage();
        }
        else {
            setSendEmailErr(true);
        }
    }

    // handle verification of token
    async function handleVerificationCode(e) {
        e.preventDefault();
        
        const postData = {
            verification_code: String(verification_code.value),
            email: String(email.value)
        }
        const result = await verifyResetPasswordCodeApi(postData);

        if (result.data.verified_code) {
            setInvalidVerificationCode(false);
            //set verification token to hidden input
            setVerificationToken(result.data.verification_token);
            incrementPage();
        }
        else {
            setInvalidVerificationCode(true);
        }
    }


    // handle verification of token
    async function handleResetPassword(e) {
        e.preventDefault();

        if(password.value !== confirmPassword.value) {
            setConfirmPasswordNotMatch(true);
            return;
        }

        setConfirmPasswordNotMatch(false);

        const postData = {
            verification_token: verification_token,
            email: String(email.value),
            password: String(password.value)
        }
        const result = await resetPasswordApi(postData);

        if (result.data.password_changed) {
            setPasswordChangeErr(false);
            incrementPage();
        }
        else {
            setPasswordChangeErr(true);
        }
    }

    function handleBackBtn() {
        decrementPage();
    }

    useEffect(() => {
        document.title = pageTitle;
    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Paper elevation={3}>

                    {(pageIndex === 0) && 
                    <Container maxWidth="xs">
                        <Grid container justify="center">
                            <Typography component="h1" variant="h5">
                                Forgot Password
                            </Typography>
                            <form className={classes.form} onSubmit={handleSendEmail}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email"
                                            name="email"
                                            {...email}
                                            autoComplete="email"
                                            autoFocus
                                        />
                                    </Grid>
                                </Grid>
                    
                                {sendEmailErr && <div className={classes.error_text}>{"Email not found or incorrect email entered"}</div>}
                            
                                <Grid container justify="flex-end">
                                    <Grid item xs={6}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            onClick={handleSendEmail}
                                        >
                                            Send
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <Link href={staticRoutes.member.login} variant="body2">
                                            Already have an account? Sign in
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Container>}

                    {(pageIndex === 1) && 
                    <Container maxWidth="xs">
                        <Grid container justify="center">
                            <Typography component="h1" variant="h5">
                                Enter Verification Code
                            </Typography>

                            <Typography component="p">
                                An email has been sent to <b>{email.value}</b> 
                                <br/>
                                Please check your email for a message with the code.
                            </Typography>
                            <form className={classes.form} onSubmit={handleVerificationCode}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="verification_code"
                                            label="Enter code"
                                            name="verification_code"
                                            {...verification_code}
                                            autoFocus
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container justify="center">
                                    <Grid item>
                                        <Link href="#" variant="body2" onClick={handleBackBtn}>
                                            Didn't get a code?
                                        </Link>
                                    </Grid>
                                </Grid>

                                {invalidVerificationCode && <div className={classes.error_text}>{"Verification code is invalid or has expired."}</div>}

                                <Grid container justify="center" spacing={2}>
                                    <Grid item xs={6} >
                                        <Button
                                            type="button"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            onClick={handleBackBtn}
                                        >
                                            Back
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            onClick={handleVerificationCode}
                                        >
                                            Verify
                                        </Button>
                                    </Grid>
                                </Grid>  
                            </form>
                        </Grid>
                    </Container>}

                    {(pageIndex === 2) && 
                    <Container maxWidth="xs">
                        <Grid container justify="center">
                            <Typography component="h1" variant="h5">
                                Reset Password
                            </Typography>
                            <form className={classes.form} onSubmit={handleResetPassword}>
                                <Grid container spacing={0}>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            id="password"
                                            {...password}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            id="confirmPassword"
                                            {...confirmPassword}
                                        />
                                        <input
                                            type="hidden" 
                                            name="verification_token" 
                                            value={verification_token}
                                        />
                                    </Grid>
                                </Grid>

                                {passwordChangeErr && <div className={classes.error_text}>{"Error, something went wrong with changing your password. Please try again later."}</div>}

                                {confirmPasswordNotMatch && <div className={classes.error_text}>{"Entered password does not match."}</div>}

                                <Grid container justify="flex-end" spacing={2}>
                                    <Grid item xs={6} >
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            onClick={handleResetPassword}
                                        >
                                            Change
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Container>}

                    {(pageIndex === 3) &&
                    <Container maxWidth="xs">
                        <Grid container justify="center">
                            <Typography component="h1" variant="h5">
                                Password Successfully changed!
                            </Typography>
                            <Grid container justify="flex-end" spacing={2}>
                                <Grid item xs={6} >
                                    <Button
                                        href={staticRoutes.member.login}
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
                    </Container>}
                
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
export default ForgotPassword;