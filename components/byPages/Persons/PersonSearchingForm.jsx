import React, {useState} from 'react';
import Select from 'react-select'
import InputForm from "../../UI/Input/InputForm";
import ButtonForm from "../../UI/Buttons/ButtonForm";
import * as SelectCustomStyles from "../../../styles/SelectCustomStyles";
const PersonSearchingForm = ({onChangeFunction, settingsPerson}) => {

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

    const varMode = {
        button: 'Очистить фильтры', title: 'Поиск персоны', style: {}
    }

    async function onClickAct(e) {
        e.preventDefault()
        setPersonInfo({
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
        onChangeFunction('')
    }

    return (<div style={{display: "flex", flexDirection: "column"}}>
        <h3 style={varMode.style}>{varMode.title}</h3>
        <form className="PersonDataForm">
            <div className="MainPersonData" style={{display: "flex", flexDirection: "row", width: "100%"}}>
                <InputForm value={personInfo.surname}
                           style={{width: "23.33%"}}
                           onChange={e => {
                               setPersonInfo({...personInfo, surname: e.target.value})
                               onChangeFunction({...personInfo, surname: e.target.value})
                           }}
                           type="text"
                           placeholder="Фамилия.." required/>
                <InputForm value={personInfo.name}
                           onChange={e => {
                               setPersonInfo({...personInfo, name: e.target.value})
                               onChangeFunction({...personInfo, name: e.target.value})
                           }}
                           type="text"
                           style={{width: "23.33%"}}
                           placeholder="Имя.." required/>
                <InputForm value={personInfo.secName}
                           onChange={e => {
                               setPersonInfo({...personInfo, secName: e.target.value})
                               onChangeFunction(personInfo)
                           }}
                           type="text"
                           style={{width: "23.33%"}}
                           placeholder="Отчество.."/>
                <InputForm value={personInfo.dateBirth}
                           style={{width: "15%"}}
                           onChange={e => {
                               onChangeFunction({...personInfo, dateBirth: e.target.value})
                               setPersonInfo({...personInfo, dateBirth: e.target.value})
                           }}
                           type="date"
                           required/>
                <Select
                    styles={{
                        container: (baseStyles) => ({
                            ...baseStyles, width: "15%", display: "block"
                        }), control: (baseStyles, {isFocused}) => ({
                            ...baseStyles, borderColor: "black", borderRadius: "2px", margin: "5px"
                        }),
                    }}
                    value={personInfo.gender}
                    theme={SelectCustomStyles.selectThemes}
                    placeholder="Пол..."
                    options={settingsPerson.genderList}
                    isClearable
                    isSearchable
                    required
                    onChange={e => {
                        onChangeFunction({...personInfo, gender: e})
                        setPersonInfo({...personInfo, gender: e})
                    }}
                />
            </div>
            <div className="LocationPersonData" style={{display: "flex", flexDirection: "row"}}>
                <Select
                    value={personInfo.locationRegion}
                    styles={SelectCustomStyles.selectStylesFour}
                    theme={SelectCustomStyles.selectThemes}
                    placeholder="Регион..."
                    options={settingsPerson.locationRegionList}
                    isClearable
                    isSearchable
                    onChange={e => {
                        onChangeFunction({...personInfo, locationRegion: e})
                        setPersonInfo({...personInfo, locationRegion: e})
                    } }
                />
                <Select
                    value={personInfo.locationCity}
                    styles={SelectCustomStyles.selectStylesFour}
                    theme={SelectCustomStyles.selectThemes}
                    placeholder="Город..."
                    options={settingsPerson.locationCityList}
                    isClearable
                    isSearchable
                    onChange={e => {
                        onChangeFunction({...personInfo, locationCity: e})
                        setPersonInfo({...personInfo, locationCity: e})
                    }}
                />
                <Select
                    value={personInfo.department}
                    styles={SelectCustomStyles.selectStylesFour}
                    theme={SelectCustomStyles.selectThemes}
                    placeholder="Ведомство..."
                    options={settingsPerson.departmentList}
                    isClearable
                    isSearchable
                    onChange={e => {
                        onChangeFunction({...personInfo, department: e})
                        setPersonInfo({...personInfo, department: e})
                    }}
                />
                <Select
                    value={personInfo.organization}
                    styles={SelectCustomStyles.selectStylesFour}
                    theme={SelectCustomStyles.selectThemes}
                    placeholder="Организация..."
                    options={settingsPerson.organizationList}
                    isClearable
                    isSearchable
                    onChange={e => {
                        setPersonInfo({...personInfo, organization: e})
                        onChangeFunction({...personInfo, organization: e})
                    }}
                />
            </div>
            <div className="qualPersonData" style={{display: "flex", flexDirection: "row"}}>
                <Select
                    value={personInfo.refereeRank}
                    styles={SelectCustomStyles.selectStylesThree}
                    theme={SelectCustomStyles.selectThemes}
                    placeholder="Судейское звание..."
                    options={settingsPerson.refereeRankList}
                    isClearable
                    isSearchable
                    onChange={e => {
                        onChangeFunction({...personInfo, refereeRank: e})
                        setPersonInfo({...personInfo, refereeRank: e})
                    }}
                />
                <Select
                    value={personInfo.athleteRank}
                    styles={SelectCustomStyles.selectStylesThree}
                    theme={SelectCustomStyles.selectThemes}
                    placeholder="Спортивное звание..."
                    options={settingsPerson.athleteRankList}
                    isClearable
                    isSearchable
                    onChange={e => {
                        onChangeFunction({...personInfo, athleteRank: e})
                        setPersonInfo({...personInfo, athleteRank: e})
                    }}
                />
                <Select
                    value={personInfo.qualifyDegree}
                    styles={SelectCustomStyles.selectStylesThree}
                    theme={SelectCustomStyles.selectThemes}
                    placeholder="Аттестационная степень..."
                    options={settingsPerson.qualifyDegreeList}
                    isClearable
                    isSearchable
                    onChange={e => {
                        onChangeFunction({...personInfo, qualifyDegree: e})
                        setPersonInfo({...personInfo, qualifyDegree: e})
                    }}
                />
            </div>
            <div className="addButton" style={{display: "flex", flexDirection: "row-reverse"}}>
                <ButtonForm onClick={onClickAct} style={{width: "20%"}}>
                    {varMode.button}
                </ButtonForm>
            </div>
        </form>
    </div>);
}

export default PersonSearchingForm;