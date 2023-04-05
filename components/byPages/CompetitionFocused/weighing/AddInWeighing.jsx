import React, {useState} from 'react';
import * as SelectCustomStyles from "../../../../styles/SelectCustomStyles";
import Select from "react-select";

const AddInWeighing = ({personsList, settings}) => {
    const [trainer, setTrainer] = useState([])
    const [info, setInfo] = useState({
        surname: '',
        name: '',
        secName: '',
        dateBirth: '',
        gender: '',
        department: '',
        organization: '',
        locationRegion: '',
        locationCity: '',
        refereeRank: '',
        athleteRank: '',
        qualifyDegree: ''
    })
    return (
        <div>
            <Select
                value={trainer}
                styles={SelectCustomStyles.selectStylesOne}
                theme={SelectCustomStyles.selectThemes}
                placeholder="Тренер(ы)..."
                options={personsList}
                isClearable
                isSearchable
                isMulti
                onChange={e => setTrainer(e)}
            />
            <Select
                value={trainer}
                styles={SelectCustomStyles.selectStylesOne}
                theme={SelectCustomStyles.selectThemes}
                placeholder="Тренер(ы)..."
                options={personsList}
                isClearable
                isSearchable
                isMulti
                onChange={e => setTrainer(e)}
            />
        </div>
    );
};

export default AddInWeighing;