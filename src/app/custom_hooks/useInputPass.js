import React, { useState } from "react";
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// custom hook for input password
const useInputPass = initialValue => {

    const [showPassword, setShowPassword] = useState(false);

    const [value, setValue] = useState(initialValue);

    const handleChangePass = e => {
        setValue(e.target.value);
        //if value is empty, reset showPassword to false
        if(!e.target.value) {
            setShowPassword(false);
        }
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const renderEndAdornment = () => {
        return (
            <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
            </InputAdornment>
        )
    };

    function getHook() {
        if (value) {
            return {
                value,
                onChange: handleChangePass,
                InputProps: {
                    endAdornment: renderEndAdornment()
                },
                type: (showPassword ? 'text' : 'password')
            }
        }
        else {
            return {
                value,
                onChange: handleChangePass
            }
        }
    }
    return getHook();
}
export default useInputPass;
