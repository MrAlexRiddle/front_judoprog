import React from 'react';
import ButtonForm from "../../UI/Buttons/ButtonForm";

const HeaderCompetition = ({competitionInfo, listener}) => {

    return (
        <div className="header-competition">
            <div className="info">
                <div className="name-ages">
                    <div className="body">
                        <div className="name">{competitionInfo.name}</div>
                        <div className="ages">{competitionInfo.gendersName} {competitionInfo.agesName}</div>
                    </div>
                </div>
                <div className="dates-and-location">
                    <div className="dates">
                        <div className="box">{competitionInfo.startDate} - {competitionInfo.endDate}</div>
                    </div>
                    <div
                        className="location">
                        <div
                            className="box">{competitionInfo.locationCityName}, {competitionInfo.locationRegionName}</div>
                    </div>
                </div>
                <div className="main-persons">
                    <div className="main-judge">
                        <div className="title">Главный судья</div>
                        <div className="body">{competitionInfo.mainJudge}</div>
                    </div>
                    <div className="main-secretary">
                        <div className="title">Главный секретарь</div>
                        <div className="body">{competitionInfo.mainSecretary}</div>
                    </div>
                </div>
            </div>
            <div className="buttons">
                <ButtonForm onClick={() => {listener(0)}}>Взвешивание</ButtonForm>
                <ButtonForm onClick={() => {listener(1)}}>Жеребьёвка</ButtonForm>
                <ButtonForm onClick={() => {listener(2)}}>Ход</ButtonForm>
            </div>
        </div>
    );
};

export default HeaderCompetition;