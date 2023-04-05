import React from 'react';
import CompetitionsDataService from "../../../../API/CompetitionsDataService";
import PatchPopUp from "./PatchPopUp";

const WeightRow = ({e, extra, updateTable, allSettingsPerson, personsList, weights, genders}) => {
    async function deleteFromWeight() {
        await CompetitionsDataService.deleteFromWeight(extra, {idPerson: e.idPerson, weightGender: e.weightGender})
        updateTable()
    }

    async function patchInWeight() {

    }

    return (<tr>
        <td className="num">
            <button onClick={deleteFromWeight}>D</button>
            <PatchPopUp updateTable={updateTable} personsList={personsList} weights={weights} extra={extra}
                        genders={genders} allSettingsPerson={allSettingsPerson} e={e}/>
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

export default WeightRow;