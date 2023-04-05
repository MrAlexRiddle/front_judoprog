import React, {useState} from 'react';
import classes from "./SortSelect.module.css"
import Select from "react-select";

const SortSelect = ({options, defaultValue, value, onChange}) => {
    const [val, setVal] = useState()
    const selectThemes = (theme) => ({
        ...theme, borderRadius: 0, colors: {
            ...theme.colors,
            primary25: 'lightgrey',
            primary: 'lightgrey',
            primary50: 'lightgrey',
            primary75: 'lightgrey'
        },
    })
    const selectStyles = {
        container: (baseStyles) => ({
            ...baseStyles, width: "100%", display: "block"
        }), control: (baseStyles, state) => ({
            ...baseStyles,
            margin: "10px 0px",
            borderColor: state.isFocused ? "black" : "black",
            borderRadius: state.isFocused ? "2px" : "4px",
        }),
    }
    return (<Select
        value={val}
        styles={selectStyles}
        theme={selectThemes}
        className={classes.SortSelect}
        placeholder={"Сортировать по..."}
        onChange={e => {
            setVal(e)
            onChange(e.value)
        }}
        options={options}
        isClearable/>);
};

export default SortSelect;