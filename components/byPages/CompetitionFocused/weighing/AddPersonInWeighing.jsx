import React, {useEffect, useState} from 'react';
import Select from 'react-select'
import ButtonForm from "../../../UI/Buttons/ButtonForm";
import * as SelectCustomStyles from "../../../../styles/SelectCustomStyles.js";
import PersonForm from "../../Persons/PersonForm";
import * as WeighingDataFormModes from "../Functions/WeighingDataFormModes";
import {searchValue} from "../../../functions/usefulFunc";
import PersonDataService from "../../../../API/PersonDataService";
import moment from "moment/moment";

const AddPersonInWeighing = ({mode, onClickFunction, settings, closeTooltip, weight, personsList, infoEdit}) => {
    const [info, setInfo] = useState({
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
    const [flag, setFlag] = useState(false)
    const [isEnable, setIsEnable] = useState(false)
    const [trainer, setTrainer] = useState([])
    const [varMode, setVarMode] = useState({
        button: 'Добавить пользователя', title: 'Форма добавления персоны в весовую категорию ' + weight, style: {}
    })

    async function getPersonData(id) {
        const data = await PersonDataService.getPerson(id)
        setInfo({
            surname: data[0].surname,
            name: data[0].name,
            secName: data[0].secName,
            dateBirth: moment(data[0].dateBirth).format('YYYY-MM-DD'),
            gender: settings.genderList[searchValue(settings.genderList, data[0].genderName)],
            department: settings.departmentList[searchValue(settings.departmentList, data[0].departmentName)],
            organization: settings.organizationList[searchValue(settings.organizationList, data[0].organizationName)],
            locationRegion: settings.locationRegionList[searchValue(settings.locationRegionList, data[0].locationRegionName)],
            locationCity: settings.locationCityList[searchValue(settings.locationCityList, data[0].locationCityName)],
            refereeRank: settings.refereeRankList[searchValue(settings.refereeRankList, data[0].refereeRankName)],
            athleteRank: settings.athleteRankList[searchValue(settings.athleteRankList, data[0].athleteRankName)],
            qualifyDegree: settings.qualifyDegreeList[searchValue(settings.qualifyDegreeList, data[0].qualifyDegreeName)],
            extra: data[0].extra
        })
    }

    async function onClickAct(e) {
        e.preventDefault()
        if (info.name === '' || info.surname === '' || info.dateBirth === '' || info.gender === '') {
            console.log('Ошибка! Поля с фамилией, именем, датой рождения и полом обязательны к заполнению!')
            return
        } else {
            onClickFunction(weight, info, setInfo, trainer, flag)
            closeTooltip()
        }

    }

    function usingMode() {
        if (mode === 1) {
            WeighingDataFormModes.patchMode(setVarMode, infoEdit, setInfo, settings, setTrainer, trainer)
        } else if (mode === 0) {
            WeighingDataFormModes.postMode(setVarMode)
        }
    }

    useEffect(() => {
        usingMode()
    }, [])

    return (<div style={{display: "flex", flexDirection: "column", width: "100%"}}>
        <h3 style={varMode.style}>{varMode.title}</h3>
        <div>
            <input type="checkbox" onChange={e => {
                setFlag(!flag)
                setInfo({
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
            }}/>
            <div>Создать новую персону и добавить в в/к</div>
        </div>
        {(!flag)?
        <Select
            styles={SelectCustomStyles.selectStylesOne}
            theme={SelectCustomStyles.selectThemes}
            placeholder="Выберите персону..."
            options={personsList}
            isClearable
            isSearchable
            isDisabled={flag}
            onChange={async e => {
                if (e !== null) {
                    await getPersonData(e.extra)
                    setIsEnable(true)
                } else {
                    setIsEnable(false)
                }
            }}
        /> : <div></div>}

        {(isEnable || flag)?
            <form className="PersonDataForm">
                <PersonForm setPersonInfo={setInfo} personInfo={info} settingsPerson={settings}/>
                <Select
                    value={trainer}
                    styles={SelectCustomStyles.selectStylesOne}
                    theme={SelectCustomStyles.selectThemes}
                    placeholder="Тренер(ы)..."
                    options={personsList}
                    isClearable
                    isSearchable
                    isMulti
                    onChange={e => setTrainer(e)}
                />
                <div className="addButton" style={{display: "flex", flexDirection: "row-reverse"}}>

                    <ButtonForm onClick={onClickAct} style={{width: "20%"}}>
                        {varMode.button}
                    </ButtonForm>
                </div>
            </form>
            :
            <div></div>
        }
    </div>);
}

export default AddPersonInWeighing;