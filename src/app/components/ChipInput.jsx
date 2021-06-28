import React from 'react';

import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';

import useStyles from "./styles";
import PropTypes from 'prop-types';

const ChipInput = (props) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Autocomplete
                multiple
                freeSolo
                name={props.name}
                options={[]}
                value={props.value || []}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label={props.label || undefined}
                        placeholder={props.placeholder || undefined}
                    />
                )}
                renderTags={(tagValue, getTagProps) =>
                    tagValue.map((val, index) => (
                        <Chip
                            key={index}
                            label={val}
                            color="primary"
                            variant="outlined"
                            className={classes.chip}
                            onDelete={!props.readOnly ? (e) => { 
                                props.onDelete(props.name, val);
                            } : undefined}
                        />
                    ))
                }
                onChange={(e, val) => {
                    props.onChange(props.name, val);
                }}
                disabled={props.readOnly}
            />
        </React.Fragment>
    );
}

ChipInput.propTypes = {
    value: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    readOnly: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string
}

export default ChipInput;