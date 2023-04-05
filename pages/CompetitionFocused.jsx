import React, {useEffect, useState} from 'react';
import CompetitionsDataService from "../API/CompetitionsDataService";
import HeaderCompetition from "../components/byPages/CompetitionFocused/HeaderCompetition";
import {useParams} from "react-router-dom";
import Weighing from "../components/byPages/CompetitionFocused/Weighing";
import BouncingDotsLoader from "../components/UI/BouncingDotsLoader/BouncingDotsLoader";
import Draw from "../components/byPages/CompetitionFocused/Draw";

const CompetitionFocused = () => {
    const param = useParams()
    const extra = param.id
    const [competitionInfo, setCompetitionInfo] = useState({})
    const [isUpdate, setIsUpdate] = useState(Date.now())
    const [mode, setMode] = useState(99)
    const [isLoading, setIsLoading] = useState(true)

    function updateTable() {
        setIsUpdate(Date.now())
    }

    function getInfo() {
        setIsLoading(true)
        setTimeout(async () => {
            setCompetitionInfo(await CompetitionsDataService.getOne(extra))
            setIsLoading(false)
        }, 1000)
    }

    useEffect(() => {

        getInfo(extra)
    }, [])

    return (<div className="competition-focused">

        {(isLoading) ? <BouncingDotsLoader/> : <div>
            <HeaderCompetition listener={setMode} competitionInfo={competitionInfo}/>
            {(mode === 0)? <Weighing competitionInfo={competitionInfo} extra={extra}/> : (mode === 1) ? <Draw competitionInfo={competitionInfo} extra={extra}/> : <div>CHANGE</div>}


        </div>}

    </div>);
};

export default CompetitionFocused;