import React from "react";
import classes from "./BouncingDotsLoader.module.css";

const BouncingDotsLoader = (props) => {
    return (
        <>
            <div className={classes.bouncingLoader}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </>
    );
};

export default BouncingDotsLoader;