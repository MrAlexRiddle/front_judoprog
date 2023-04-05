import React from 'react';
import ButtonForm from "../../UI/Buttons/ButtonForm";
import CompetitionsDataService from "../../../API/CompetitionsDataService";
import CompetitionPopupUpdate from "./CompetitionPopupUpdate";

const CompetitionItem = ({CompetitionInfo, updateTable, settings, patchCompetition}) => {

    async function deleteItem() {
        const list = await CompetitionsDataService.deleteComp(CompetitionInfo.extra)
        updateTable()
        console.log('Delete ' + CompetitionInfo.extra + ' status ' + list)
    }

    let genders = []
    let men = []
    let women = []
    genders = CompetitionInfo.gendersName
    genders = genders.toString().split(' ')
    men = CompetitionInfo.weights
    men = men.slice(men.indexOf('m'), men.indexOf('w') - 1).toString().split(' ').slice(1)
    women = CompetitionInfo.weights
    women = women.slice(women.indexOf('w')).toString().split(' ').slice(1)

    return (<div className="competitions-item">
        <div className="info">
            <div className="dates-and-location">
                <div className="dates">
                    <div className="box">{CompetitionInfo.startDate} - {CompetitionInfo.endDate}</div>
                </div>
                <div
                    className="location">
                    <div className="box">{CompetitionInfo.locationCityName}, {CompetitionInfo.locationRegionName}</div>
                </div>
            </div>
            <div className="name-ages">
                <div className="body">
                    <div className="name">{CompetitionInfo.name}</div>
                    <div className="ages">{CompetitionInfo.gendersName} {CompetitionInfo.agesName}</div>
                </div>

            </div>
            <div className="gender-weight">
                <div className="box">
                    <div className="title">Весовые категории:</div>
                    <div className="body">
                        <div className="men">{genders[0]} : {men.toString()}</div>
                        <div className="women">{genders[2]} : {women.toString()}</div>
                    </div>
                </div>
            </div>
            <div className="main-persons">
                <div className="main-judge">
                    <div className="title">Главный судья</div>
                    <div className="body">{CompetitionInfo.mainJudge}</div>
                </div>
                <div className="main-secretary">
                    <div className="title">Главный секретарь</div>
                    <div className="body">{CompetitionInfo.mainSecretary}</div>
                </div>
            </div>
        </div>
        <div className="buttons">
            <CompetitionPopupUpdate settings={settings} competitionInfoEdit={CompetitionInfo}
                                    patchCompetition={patchCompetition}/>
            <ButtonForm style={{width: "50%", marginLeft: "5px"}} onClick={deleteItem}>Удалить</ButtonForm>
        </div>
        <a href={"/competitions/" + CompetitionInfo.extra} style={{width: '100%'}}>
            <ButtonForm style={{width: '100%'}}>Перейти к соревнованию...</ButtonForm>
        </a>
    </div>);
};

export default CompetitionItem;