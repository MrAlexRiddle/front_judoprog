export const selectStylesFour = {
    container: (baseStyles) => ({
        ...baseStyles, width: "25%", display: "block"
    }), control: (baseStyles, {isFocused}) => ({
        ...baseStyles, borderColor: "black", borderRadius: "2px", margin: "5px"
    }),menuList: (baseStyles) => ({
        ...baseStyles, maxHeight: "200px"
    })
}
export const selectStylesThree = {
    container: (baseStyles) => ({
        ...baseStyles, width: "33.33%", display: "block"
    }), control: (baseStyles, state) => ({
        ...baseStyles,
        margin: "5px",
        borderColor: state.isFocused ? "black" : "black",
        borderRadius: state.isFocused ? "2px" : "4px",
    }),menuList: (baseStyles) => ({
        ...baseStyles, maxHeight: "200px"
    })
}
export const selectStylesOne = {
    container: (baseStyles) => ({
        ...baseStyles, width: "100%", display: "block"
    }),
    control: (baseStyles, state) => ({
        ...baseStyles,
        margin: "5px",
        borderColor: state.isFocused ? "black" : "black",
        borderRadius: state.isFocused ? "2px" : "4px",
    }),
    menuList: (baseStyles) => ({
        ...baseStyles, maxHeight: "200px"
    })
}
export const selectThemes = (theme) => ({
    ...theme, borderRadius: 0, colors: {
        ...theme.colors,
        primary25: 'lightgrey',
        primary: 'lightgrey',
        primary50: 'lightgrey',
        primary75: 'lightgrey'
    },
})