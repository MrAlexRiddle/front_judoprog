import React, {useEffect, useRef, useState} from 'react';
import Select from "react-select";
import CompetitionsDataService from "../../../../API/CompetitionsDataService";

const DrawRow = ({e, extra, strengthArr, updateTable}) => {
    const firstUpdate = useRef(true);
    const options = strengthArr.map(e => {return{label:e, value:e}})
    const [strength, setStrength] = useState({label: e.strength, value: e.strength})
    useEffect(()=>{
        if (firstUpdate.current) {
            firstUpdate.current = false;
        } else {
            getStrength()
        }

    }, [strength])
    async function getStrength(){
        await CompetitionsDataService.setStrength(extra, {weightGender:e.weightGender, personId:e.idPerson}, {strength:strength.label})
        updateTable()
    }

    function handleChange(e) {
        setStrength({...strength, value: e.value, label:e.label})
    }


    return (<tr>
        <td className="strength">
            <Select value={strength} options={options} onChange={e  => {handleChange(e)}}/>
                    </td>
        <td className="fio">{e.surname} {e.name} {e.secName}</td>
        <td className="dateBirth">{e.dateBirth}</td>
        <td className="department">{e.departmentName}</td>
        <td className="locationRegion">{e.locationRegionName}</td>
        <td className="locationCity">{e.locationCityName}</td>
        <td className="athleteRank">{e.athleteRankName}</td>
        <td className="trainers">{e.trainerId}</td>
    </tr>)
};

export default DrawRow;