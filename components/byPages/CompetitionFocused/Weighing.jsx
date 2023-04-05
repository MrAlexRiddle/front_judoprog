import React, {useEffect, useState} from 'react';
import AddPopUp from "./weighing/AddPopUp";
import SelectWeight from "./weighing/SelectWeight";
import WeighingList from "./weighing/WeighingList";
import {GetSettingsPerson} from "../../functions/settings";
import * as SettingsService from "../../../API/SettingsService";
import CompetitionsDataService from "../../../API/CompetitionsDataService";

const Weighing = ({extra, competitionInfo}) => {
    const [weighingList, setWeighingList] = useState([])
    const [weightInfo, setWeightInfo] = useState([[], []])
    const [isUpdate, setIsUpdate] = useState(Date.now())
    const [chosenWeightGender, setChosenWeightGender] = useState('')

    function setChosenWG(wg) {
        setChosenWeightGender(wg)
    }

    function updateTable() {
        setIsUpdate(Date.now())
    }

    let key = []

    const [allSettingsPerson, setAllSettingsPerson] = useState({})

    async function setSettingsPerson() {
        setAllSettingsPerson(await GetSettingsPerson())
    }

    useEffect(() => {
        setSettingsPerson()
    }, [])

    const [personsList, setPersonsList] = useState()

    async function setPersons() {
        setPersonsList(await SettingsService.getPersonsFIO())
    }

    useEffect(() => {
        setPersons()
    }, [isUpdate])

    function createWeighing(arr, weight) {
        let weighingPersons = []
        key = []
        let i = 0
        arr.map(e => {
            if (weight == e.weightGender) {
                i += 1
                e = {...e, key: i}
                weighingPersons.push(e)
            }
        })
        setWeighingList(weighingPersons)
    }

    async function setWeights() {
        setWeightInfo(await CompetitionsDataService.weighingByWeight(extra))
    }

    useEffect(() => {
        setWeights()
    }, [isUpdate])

    useEffect(() => {
        createWeighing(weightInfo, chosenWeightGender.label)
    }, [weightInfo, chosenWeightGender])

    return (<div>
            <AddPopUp GenderWeight={''} extra={extra} personsList={personsList} updateTable={updateTable}
                      allSettingsPerson={allSettingsPerson} weights={competitionInfo.weights} genders={competitionInfo.gendersName} flag={false}/>
            <SelectWeight choosen={''} weights={competitionInfo.weights} genders={competitionInfo.gendersName}
                          handleChange={setChosenWG}/>
        {chosenWeightGender !== ''? <WeighingList extra={extra} GenderWeight={chosenWeightGender} weights={competitionInfo.weights}
            genders={competitionInfo.gendersName} allSettingsPerson={allSettingsPerson}
            weighingList={weighingList} updateTable={updateTable}
            personsList={personsList}/> : <div>Выбирите весовую категорию</div>}

        </div>);
};

export default Weighing;