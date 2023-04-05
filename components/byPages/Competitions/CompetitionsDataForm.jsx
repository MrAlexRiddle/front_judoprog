import React, {useEffect, useState} from 'react';
import InputForm from "../../UI/Input/InputForm";
import Select from "react-select";
import ButtonForm from "../../UI/Buttons/ButtonForm";
import * as CompetitionsDataFormModes from "./Functions/CompetitionsDataFormModes";

const CompetitionsDataForm = ({mode, settings, onClickFunction, competitionInfoEdit, closeTooltip}) => {
    const [competitionInfo, setCompetitionInfo] = useState({
        name: '',
        startDate: '',
        endDate: '',
        locationRegion: '',
        locationCity: '',
        weights: '',
        ages: '',
        mainJudge: '',
        mainSecretary: ''
    })
    const [varMode, setVarMode] = useState({
        button: '', title: '', style: {}
    })
    const [menWeight, setMenWeight] = useState('')
    const [womenWeight, setWomenWeight] = useState('')

    function formatOut(competitionInfo) {
        return ({
            name: (competitionInfo.name !== '') ? competitionInfo.name : '',
            startDate: (competitionInfo.startDate !== '') ? competitionInfo.startDate : '',
            endDate: (competitionInfo.endDate !== '') ? competitionInfo.endDate : '',
            locationRegion: (competitionInfo.locationRegion !== '') ? competitionInfo.locationRegion.value : '',
            locationCity: (competitionInfo.locationCity !== '') ? competitionInfo.locationCity.value : '',
            weights: (competitionInfo.weights !== '') ? competitionInfo.weights : '',
            ages: (competitionInfo.ages !== '') ? competitionInfo.ages.value : '',
            mainJudge: (competitionInfo.mainJudge !== '') ? competitionInfo.mainJudge.extra : '',
            mainSecretary: (competitionInfo.mainSecretary !== '') ? competitionInfo.mainSecretary.extra : ''
        })
    }

    function setAll(a, b, c) {
        setCompetitionInfo(a)
        setMenWeight(b)
        setWomenWeight(c)
    }

    function onClickAct(e) {
        e.preventDefault()
        competitionInfo.weights = 'm ' + menWeight + ' w ' + womenWeight
        if (competitionInfo.name !== '' && competitionInfo.startDate !== '' && competitionInfo.endDate !== '' && competitionInfo.locationRegion !== '' && competitionInfo.locationCity !== '' && competitionInfo.ages !== '' && competitionInfo.weights !== '' && competitionInfo.mainJudge !== '' && competitionInfo.mainSecretary !== '') {
            onClickFunction(competitionInfoEdit, formatOut(competitionInfo), setAll)
            closeTooltip()
        } else {
            alert('Заполните всю информацию о соревновании!')
        }
    }

    function usingMode() {
        if (mode === 1) {
            CompetitionsDataFormModes.patchMode(setVarMode, competitionInfoEdit, setCompetitionInfo, settings)
            setMenWeight(competitionInfoEdit.weights.slice(competitionInfoEdit.weights.indexOf('m'), competitionInfoEdit.weights.indexOf('w') - 1).toString().split(' ').slice(1).join(' '))
            setWomenWeight(competitionInfoEdit.weights.slice(competitionInfoEdit.weights.indexOf('w')).toString().split(' ').slice(1).join(' '))
        } else if (mode === 0) {
            CompetitionsDataFormModes.postMode(setVarMode)
        }
    }
    //console.log(competitionInfo)
    useEffect(() => {
        usingMode()
    }, [])

    return (<div style={{width: "100%", minWidth: "300px", margin: "auto"}}>
        <div style={{margin: "0.3% 0px"}}>
            <h3 style={varMode.style}>{varMode.title}</h3>
            <InputForm
                value={competitionInfo.name}
                style={{width: "99.4%"}} placeholder={'Название соревнования...'}
                onChange={e => setCompetitionInfo({...competitionInfo, name: e.target.value})}/>
        </div>
        <div style={{display: "flex", flexDirection: "row", margin: "10px 0px"}}>
            <div style={{display: "flex", flexDirection: "column", width: "50%", marginRight: "0.3%"}}>
                <div>Дата начала:</div>
                <InputForm
                    value={competitionInfo.startDate}
                    type="date"
                    onChange={e => setCompetitionInfo({...competitionInfo, startDate: e.target.value})}/>
            </div>
            <div style={{display: "flex", flexDirection: "column", width: "50%", marginLeft: "0.3%"}}>
                <div>Дата окончания:</div>
                <InputForm
                    value={competitionInfo.endDate}
                    type="date"
                    onChange={e => setCompetitionInfo({...competitionInfo, endDate: e.target.value})}/>
            </div>
        </div>
        <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
            <div>Место проведения:</div>
            <div style={{display: "flex", flexDirection: "row"}}>
                <Select
                    value={competitionInfo.locationCity}
                    isClearable
                    isSearchable
                    styles={{
                        container: (baseStyles) => ({
                            ...baseStyles, width: "50%", display: "block"
                        }), control: (baseStyles, {isFocused}) => ({
                            ...baseStyles, borderColor: "black", borderRadius: "2px", marginRight: "1%"
                        }),
                    }}
                    options={settings.locationCityList}
                    placeholder={'Город...'}
                    onChange={e => setCompetitionInfo({...competitionInfo, locationCity: e})}
                />
                <Select
                    value={competitionInfo.locationRegion}
                    isClearable
                    isSearchable
                    styles={{
                        container: (baseStyles) => ({
                            ...baseStyles, width: "50%", display: "block"
                        }), control: (baseStyles, {isFocused}) => ({
                            ...baseStyles, borderColor: "black", borderRadius: "2px", marginLeft: "1%"
                        }),
                    }}
                    options={settings.locationRegionList}
                    placeholder={'Регион...'}
                    onChange={e => setCompetitionInfo({...competitionInfo, locationRegion: e})}
                />
            </div>
        </div>
        <div style={{display: "flex", flexDirection: "row", margin: "10px 0px"}}>
            <div style={{width: "50%"}}>
                <Select
                    value={competitionInfo.ages}
                    isClearable
                    isSearchable
                    styles={{
                        container: (baseStyles) => ({
                            ...baseStyles, width: "100%", display: "block"
                        }), control: (baseStyles, {isFocused}) => ({
                            ...baseStyles, borderColor: "black", borderRadius: "2px"
                        }),
                    }}
                    options={settings.agesList}
                    placeholder={'Возраста...'}
                    onChange={e => setCompetitionInfo({...competitionInfo, ages: e})}
                />
            </div>
            <div style={{display: "flex", flexDirection: "column", marginLeft: "1%", width: "50%"}}>
                <div style={{display: "flex", flexDirection: "column", width: "100%", marginRight: "0.3%"}}>
                    <div>Men:</div>
                    <InputForm
                        type="text"
                        placeholder={'Весовые категории...'}
                        value={menWeight}
                        onChange={e => setMenWeight(e.target.value)}/>
                </div>
                <div style={{
                    display: "flex", flexDirection: "column", width: "100%", marginLeft: "0.3%", marginTop: "5px"
                }}>
                    <div>Women:</div>
                    <InputForm
                        type="text"
                        placeholder={'Весовые категории...'}
                        value={womenWeight}
                        onChange={e => setWomenWeight(e.target.value)}/>
                </div>
            </div>
        </div>
        <div style={{display: "flex", flexDirection: "row"}}>
            <Select
                value={competitionInfo.mainJudge}
                isClearable
                isSearchable
                styles={{
                    container: (baseStyles) => ({
                        ...baseStyles, width: "50%", display: "block"
                    }), control: (baseStyles, {isFocused}) => ({
                        ...baseStyles, borderColor: "black", borderRadius: "2px", marginRight: "1%"
                    }),
                }}
                options={settings.mainsList}
                placeholder={'Главный судья...'}
                onChange={e => setCompetitionInfo({...competitionInfo, mainJudge: e})}
            />
            <Select
                isClearable
                isSearchable
                value={competitionInfo.mainSecretary}
                styles={{
                    container: (baseStyles) => ({
                        ...baseStyles, width: "50%", display: "block"
                    }), control: (baseStyles, {isFocused}) => ({
                        ...baseStyles, borderColor: "black", borderRadius: "2px", marginLeft: "1%"
                    }),
                }}
                options={settings.mainsList}
                placeholder={'Главный секретарь...'}
                onChange={e => setCompetitionInfo({...competitionInfo, mainSecretary: e})}
            />
        </div>
        <div className="actButton" style={{display: "flex", flexDirection: "row-reverse"}}>
            <ButtonForm onClick={onClickAct} style={{width: "20%"}}>
                {varMode.button}
            </ButtonForm>
        </div>
    </div>);
};

export default CompetitionsDataForm;