import React from 'react';
import moment from "moment";
import ButtonForm from "../../UI/Buttons/ButtonForm";
import PersonsPopupUpdate from "./PersonsPopupUpdate";
import PersonDataService from "../../../API/PersonDataService";

const PersonItem = (props) => {

    async function deleteItem() {
        const list = await PersonDataService.deletePerson(props.personInfo.extra)
        props.updateTable()
        console.log('Delete ' + props.personInfo.extra + ' status ' + list)
    }

    if (moment(props.personInfo.dateBirth.split('T')[0], "YYYY-MM-DD", true).isValid()) {
        props.personInfo.dateBirth = moment(props.personInfo.dateBirth.split('T')[0]).format('DD.MM.YYYY')
    }

    return (<tr>
        <td className="idPsn" style={{display: "flex", flexDirection: "column"}}>
            <ButtonForm style={{height: 'auto', padding: '1px'}} onClick={deleteItem}>Удалить</ButtonForm>
            <PersonsPopupUpdate settingsPerson={props.settingsPerson} personInfoEdit={props.personInfo}
                                putchPerson={props.putchPerson}/>
        </td>
        <td className="surnamePsn">{props.personInfo.surname}</td>
        <td className="namePsn">{props.personInfo.name}</td>
        <td className="secNamePsn">{props.personInfo.secName}</td>
        <td className="dateBirthPsn">{props.personInfo.dateBirth}</td>
        <td className="genderPsn">{props.personInfo.genderName}</td>
        <td className="departmentPsn">{props.personInfo.departmentName}</td>
        <td className="organizationPsn">{props.personInfo.organizationName}</td>
        <td className="locationRegionPsn">{props.personInfo.locationRegionName}</td>
        <td className="locationCityPsn">{props.personInfo.locationCityName}</td>
        <td className="refereeRankPsn">{props.personInfo.refereeRankName}</td>
        <td className="athleteRankPsn">{props.personInfo.athleteRankName}</td>
        <td className="qualifyDegreePsn">{props.personInfo.qualifyDegreeName}</td>
    </tr>);
};

export default PersonItem;