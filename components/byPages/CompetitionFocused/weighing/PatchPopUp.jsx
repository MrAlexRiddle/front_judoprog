import React, {useEffect, useRef, useState} from 'react';
import Popup from "reactjs-popup";
import ButtonForm from "../../../UI/Buttons/ButtonForm";
import PersonDataService from "../../../../API/PersonDataService";
import SelectWeight from "./SelectWeight";
import moment from "moment";
import {searchValue} from "../../../functions/usefulFunc";
import PersonForm from "../../Persons/PersonForm";
import Select from "react-select";
import * as SelectCustomStyles from "../../../../styles/SelectCustomStyles";
import CompetitionsDataService from "../../../../API/CompetitionsDataService";

const PatchPopUp = ({extra, updateTable, allSettingsPerson, personsList, weights, genders, e}) => {
    const ref = useRef()
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
    const closeTooltip = () => ref.current.close()
    const [chosen, setChosen] = useState({})
    const [trainer, setTrainer] = useState([])
    const [varMode, setVarMode] = useState({
        button: 'Изменить информацию', title: 'Форма изменения иформации', style: {}
    })
    useEffect(() => {
        setChosen({label:e.weightGender})
    }, [e.weightGender])

    async function getPersonData() {
        const data = await PersonDataService.getPerson(e.idPerson)
        setInfo({
            surname: data[0].surname,
            name: data[0].name,
            secName: data[0].secName,
            dateBirth: moment(data[0].dateBirth).format('YYYY-MM-DD'),
            gender: allSettingsPerson.genderList[searchValue(allSettingsPerson.genderList, data[0].genderName)],
            department: allSettingsPerson.departmentList[searchValue(allSettingsPerson.departmentList, data[0].departmentName)],
            organization: allSettingsPerson.organizationList[searchValue(allSettingsPerson.organizationList, data[0].organizationName)],
            locationRegion: allSettingsPerson.locationRegionList[searchValue(allSettingsPerson.locationRegionList, data[0].locationRegionName)],
            locationCity: allSettingsPerson.locationCityList[searchValue(allSettingsPerson.locationCityList, data[0].locationCityName)],
            refereeRank: allSettingsPerson.refereeRankList[searchValue(allSettingsPerson.refereeRankList, data[0].refereeRankName)],
            athleteRank: allSettingsPerson.athleteRankList[searchValue(allSettingsPerson.athleteRankList, data[0].athleteRankName)],
            qualifyDegree: allSettingsPerson.qualifyDegreeList[searchValue(allSettingsPerson.qualifyDegreeList, data[0].qualifyDegreeName)],
            extra: data[0].extra
        })
        let list = []
        let i = 0
        while(i < e.trainerId.split(' ').length) {
            list.push(personsList[searchValue(personsList, e.trainerId.split(' ')[i] + ' '+ e.trainerId.split(' ')[i+1]+' '+e.trainerId.split(' ')[i+2])])
            i+=3
        }
        setTrainer(list)
    }

    useEffect(() => {
        getPersonData()
    }, [])

    async function patchPerson(extra, personInfo) {
        const personInfoEdit = {extra: extra}
        const list = PersonDataService.patchPerson(personInfo, personInfoEdit)
    }
    async function patchInWeight(extra, oldInfo, newInfo) {
                const list = CompetitionsDataService.patchInWeight(extra, oldInfo, newInfo)
    }


    async function patch() {
        const oldInfo = {weightGender:e.weightGender, personId: e.idPerson}
        let trainersStr = ''
        let i = 0
        while(i < trainer.length){
            trainersStr += trainer[i].extra
            if(i !== trainer.length-1) {
                trainersStr += ' '
            }
            i +=1
        }
        const newInfo = {weightGender:chosen.label, trainerId: trainersStr}
        await patchPerson(e.idPerson, info)
        await patchInWeight(extra, oldInfo, newInfo)
        updateTable()
    }

    async function onClickAct(e){
        e.preventDefault()
        await patch()
        updateTable()
        closeTooltip()
    }

    function changeGender(gweight) {
        setChosen(gweight)
    }

    return (<div className='post-and-add'>
        <Popup trigger={<button>R</button>}
               modal
               ref={ref} nested>

            <div style={{
                background: "lightgrey",
                padding: "20px 10px",
                borderRadius: "3px",
                boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                margin: "2px"
            }}>
                <SelectWeight chosen={chosen} weights={weights} genders={genders} handleChange={changeGender}/>
                <form className="PersonDataForm">
                    <PersonForm setPersonInfo={setInfo} personInfo={info} settingsPerson={allSettingsPerson}/>
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
            </div>
        </Popup>
    </div>);
};

export default PatchPopUp;