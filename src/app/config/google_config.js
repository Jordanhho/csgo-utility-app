const RECAPTCHA_PUBLIC_KEY = "6Le3Fc8aAAAAAKBXi3l7YapjWeDofPZtcXdr-6Oa";
const RECAPTCHA_INVISIBLE_PUBLIC_KEY = "6LdKZtgaAAAAANFoogKWxN-InASswLWZwo0ucszB";
const RECAPTCHA_TEST_PUBLIC_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

//returns the recaptcha key based on if node environment is development or production
function getRecaptchaInvisiblePublicKey() {
    if(process.env.NODE_ENV === "development") {
        return RECAPTCHA_TEST_PUBLIC_KEY;
    }
    else {
        return RECAPTCHA_INVISIBLE_PUBLIC_KEY;
    }
}
function getRecaptchaPublicKey() {
    if (process.env.NODE_ENV === "development") {
        return RECAPTCHA_TEST_PUBLIC_KEY;
    }
    else {
        return RECAPTCHA_PUBLIC_KEY;
    }
}

module.exports = {
    RECAPTCHA_PUBLIC_KEY,
    RECAPTCHA_INVISIBLE_PUBLIC_KEY,
    RECAPTCHA_TEST_PUBLIC_KEY,
    getRecaptchaPublicKey,
    getRecaptchaInvisiblePublicKey
}