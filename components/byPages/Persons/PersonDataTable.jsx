import React from 'react';
import PersonItem from "./PesonItem";

const PersonDataTable = ({personData, putchPerson, settingsPerson, updateTable}) => {
    return (
        <div>
            <h3>Список зарегистрированных персон</h3>
            <table className="PersonDataTable">
                <thead>
                <tr style={{width:"auto"}}>
                    <td className="idPsn" style={{display: "flex", flexDirection: "column"}}>
                    </td>
                    <td className="surnamePsn">Фамилия</td>
                    <td className="namePsn">Имя</td>
                    <td className="secNamePsn">Отчество</td>
                    <td className="dateBirthPsn">Дата рождения</td>
                    <td className="genderPsn">Пол</td>
                    <td className="departmentPsn">Ведомство</td>
                    <td className="organizationPsn">Организация</td>
                    <td className="locationRegionPsn">Регион</td>
                    <td className="locationCityPsn">Город</td>
                    <td className="refereeRankPsn">Судейский<br/>ранг</td>
                    <td className="athleteRankPsn">Спортивный<br/>ранг</td>
                    <td className="qualifyDegreePsn" style={{width:"auto"}}>Аттестационная<br/>степень</td>
                </tr>
                </thead>
                <tbody>
                {personData.map((personInfo) =>
                    <PersonItem updateTable = {updateTable} putchPerson={putchPerson} settingsPerson={settingsPerson} personInfo={personInfo} key={personInfo.extra}/>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default PersonDataTable;