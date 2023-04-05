import React, {useEffect, useState} from 'react';
import Select from "react-select";
import * as SelectCustomStyles from "../../../../styles/SelectCustomStyles";

const SelectWeight = ({chosen, weights, genders, handleChange, flag}) => {
    const [selected, setSelected] = useState('')
    useEffect( () => {
            if (chosen !== '') {
                setSelected(chosen)
            }
        }
    ,[])

    let gender = []
    let men = []
    let women = []

    function format() {
        gender = genders
        gender = gender.toString().split(' ')
        men = weights
        men = men.slice(men.indexOf('m'), men.indexOf('w') - 1).toString().split(' ').slice(1)
        let i = 0
        let mass = []
        let info = {label: '', value: 0}
        while (i < men.length) {
            info.value = +i
            info.label = men[i] + ' - ' + 'm'
            mass.push(info)
            info = {label: '', value: 0}
            i += 1
        }
        men = mass
        mass = []
        women = weights
        women = women.slice(women.indexOf('w')).toString().split(' ').slice(1)
        let j = 0
        while (j < men.length) {
            info.value = +i + j
            info.label = women[j] + ' - ' + 'w'
            mass.push(info)
            info = {label: '', value: 0}
            j += 1
        }

        women = mass
        mass = []
    }

    format()
    let options = [{label: gender[0].toString(), options: men}, {label: gender[2].toString(), options: women}]

    return (<div className='change-select'>
        <Select
            value={selected}
            options={options}
            isClearable
            isDisabled={flag}
            styles={SelectCustomStyles.selectStylesOne}
            onChange={(e) => { if(e !== null) {
                handleChange(e)
                setSelected(e)
            } else {
                handleChange('')
                setSelected('')
            }
            }}/>
    </div>);
};

export default SelectWeight;