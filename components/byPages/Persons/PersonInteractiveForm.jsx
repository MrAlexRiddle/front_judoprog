import React, {useEffect, useState} from 'react';
import ButtonForm from "../../UI/Buttons/ButtonForm";
import * as PersonDataFormModes from "./Functions/PersonDataFormModes.js"
import PersonForm from "./PersonForm";

const PersonInteractiveForm = ({mode, personInfoEdit, onClickFunction, settingsPerson, closeTooltip}) => {

    const [personInfo, setPersonInfo] = useState({
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

    const [varMode, setVarMode] = useState({
        button: '', title: '', style: {}
    })

    async function onClickAct(e) {
        e.preventDefault()
        if (personInfo.name === '' || personInfo.surname === '' || personInfo.dateBirth === '' || personInfo.gender === '') {
            console.log('Ошибка! Поля с фамилией, именем, датой рождения и полом обязательны к заполнению!')
            return
        } else {
            onClickFunction(personInfoEdit, personInfo, setPersonInfo)
            closeTooltip()
        }

    }

    function usingMode() {
        if (mode === 1) {
            PersonDataFormModes.patchMode(setVarMode, personInfoEdit, setPersonInfo, settingsPerson)
        } else if (mode === 0) {
            PersonDataFormModes.postMode(setVarMode)
        }
    }

    useEffect(() => {
        usingMode()
    }, [])

    return (<div style={{display: "flex", flexDirection: "column", width: "100%"}}>
        <h3 style={varMode.style}>{varMode.title}</h3>
        <form className="PersonDataForm">
            <PersonForm setPersonInfo={setPersonInfo} personInfo={personInfo} settingsPerson={settingsPerson}/>
            <div className="addButton" style={{display: "flex", flexDirection: "row-reverse"}}>
                <ButtonForm onClick={onClickAct} style={{width: "20%"}}>
                    {varMode.button}
                </ButtonForm>
            </div>
        </form>
    </div>);
}

export default PersonInteractiveForm;