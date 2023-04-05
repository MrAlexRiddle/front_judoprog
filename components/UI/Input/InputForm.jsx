import React from 'react';
import classes from "./InputForm.module.css";

const InputForm = (props) => {
    return (
        <input className={classes.InForm} {...props}>

        </input>
    );
};

export default InputForm;