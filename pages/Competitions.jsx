import React, {useEffect, useRef, useState} from 'react';
import CompetitionsDataService from "../API/CompetitionsDataService";
import CompetitionsDataTable from "../components/byPages/Competitions/CompetitionsDataTable";
import BouncingDotsLoader from "../components/UI/BouncingDotsLoader/BouncingDotsLoader";
import CompetitionsDataForm from "../components/byPages/Competitions/CompetitionsDataForm";
import ButtonForm from "../components/UI/Buttons/ButtonForm";
import Popup from "reactjs-popup";
import {GetSettingsCompetition} from "../components/functions/settings";

const Competitions = () => {
    const ref = useRef()
    const closeTooltip = () => ref.current.close()
    const [competitionsData, setCompetitionsData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isUpdate, setIsUpdate] = useState(Date.now())
    const [allSettingsCompetitions, setAllSettingsCompetitions] = useState({})

    async function setSettings() {
        setAllSettingsCompetitions(await GetSettingsCompetition())
    }

    function updateTable() {
        setIsUpdate(Date.now())
    }

    async function getCompetitions() {
        setIsLoading(true)
        setTimeout(async () => {
            setCompetitionsData(await CompetitionsDataService.getCompetitionsData())
            setIsLoading(false)
        }, 1000)
    }

    useEffect(() => {
        getCompetitions()
    }, [isUpdate])
    useEffect(() => {
        setSettings()
    }, [])


    async function patchCompetition(competitionInfoEdit, competitionInfo, setAll) {
        const list = CompetitionsDataService.patchComp(competitionInfo, competitionInfoEdit)
        updateTable()
        console.log(list)
    }

    async function postMode(competitionInfoEdit, competitionInfo, setAll) {
        const list = await CompetitionsDataService.postComp(competitionInfo)
        setAll({
            name: '',
            startDate: '',
            endDate: '',
            locationRegion: '',
            locationCity: '',
            weights: '',
            ages: '',
            mainJudge: '',
            mainSecretary: ''
        }, '', '')
        updateTable()
        return list
    }

    return (<div className="competitions-page">
        <div className="competitions-area">
            <div className="post-popup-box">
                <Popup trigger={
                    <ButtonForm style={{width: "100%"}}>
                        Добавить соревнование
                    </ButtonForm>}
                       modal
                       ref={ref} nested>
                    <div className="competitions-popup">
                        <CompetitionsDataForm settings={allSettingsCompetitions} onClickFunction={postMode}
                                              closeTooltip={closeTooltip} mode={0}/>
                    </div>
                </Popup>
            </div>

            {isLoading ? <BouncingDotsLoader/> :
                <CompetitionsDataTable settings={allSettingsCompetitions} CompetitionsData={competitionsData}
                                       updateTable={updateTable} patchCompetition={patchCompetition}/>

            }
        </div>
    </div>);
};

export default Competitions;