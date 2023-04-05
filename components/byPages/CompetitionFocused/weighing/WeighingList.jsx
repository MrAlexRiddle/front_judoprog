import React, {useEffect, useState} from 'react';
import CompetitionsDataService from "../../../../API/CompetitionsDataService";
import WeightRow from "./WeightRow";
import {GetSettingsPerson} from "../../../functions/settings";
import * as SettingsService from "../../../../API/SettingsService";
import AddPopUp from "./AddPopUp";

const WeighingList = ({extra, GenderWeight, genders, weights, allSettingsPerson, personsList, updateTable, weighingList}) => {


    return (<div className='table-weighing'>
            <div className='buttons'>
                <AddPopUp GenderWeight={GenderWeight} extra={extra} personsList={personsList} updateTable={updateTable}
                          allSettingsPerson={allSettingsPerson} weights={weights} genders={genders} flag={true}/>
            </div>
            <table>
                <thead>
                <tr>
                    <td className="num">№<br/>п/п</td>
                    <td className="fio">Фамилия Имя Отчество</td>
                    <td className="dateBirth">Дата рождения</td>
                    <td className="department">СДО</td>
                    <td className="locationRegion">Регион</td>
                    <td className="locationCity">Город</td>
                    <td className="athleteRank">Разряд</td>
                    <td className="trainers">Тренер(ы)</td>
                </tr>
                </thead>
                <tbody className='body'>
                {weighingList.map((e) => <WeightRow e={e} key={e.key} extra={extra} updateTable={updateTable} personsList={personsList} allSettingsPerson={allSettingsPerson} weights={weights} genders={genders}/>)}
                </tbody>
            </table>
        </div>

    );

};

export default WeighingList;