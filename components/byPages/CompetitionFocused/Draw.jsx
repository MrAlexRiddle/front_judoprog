import React, {useEffect, useState} from 'react';
import SelectWeight from "./weighing/SelectWeight";
import CompetitionsDataService from "../../../API/CompetitionsDataService";
import DrawList from "./draw/DrawList";
import ButtonForm from "../../UI/Buttons/ButtonForm";
import Drawing from "./draw/Drawing";
import BouncingDotsLoader from "../../UI/BouncingDotsLoader/BouncingDotsLoader";

const Draw = ({extra, competitionInfo}) => {
    const [modeLocate, setModeLocate] = useState(0)
    const [modeDraw, setModeDraw] = useState(0)
    const [weighingList, setWeighingList] = useState([])
    const [weightInfo, setWeightInfo] = useState([[], []])
    const [isUpdate, setIsUpdate] = useState(Date.now())
    const [chosenWeightGender, setChosenWeightGender] = useState('')
    const [drawArray, setDrawArray] = useState([])

    function setChosenWG(wg) {
        setChosenWeightGender(wg)
    }

    function updateTable() {
        setIsUpdate(Date.now())
        console.log('update')
    }


    let key = []

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

    async function getDraw() {
        setDrawArray(await CompetitionsDataService.getDraw(extra, chosenWeightGender.label))
        setModeDraw(drawArray[0].mode)
        console.log(drawArray)
        console.log(modeDraw)
    }

    useEffect(() => {
        setWeights()
    }, [isUpdate])

    useEffect(() => {
        createWeighing(weightInfo, chosenWeightGender.label)
        if (chosenWeightGender.label) {
            getDraw()
        }
    }, [weightInfo, chosenWeightGender])

    useEffect(() => {
        setLoadDraw(false)
    }, [chosenWeightGender])

    async function startDraw() {
        const answer = await CompetitionsDataService.createDrawByWeight(extra, chosenWeightGender.label, modeLocate)
        return answer
    }

    async function clearDraw() {
        const answer = await CompetitionsDataService.clearDraw(extra, chosenWeightGender.label)
        updateTable()
        setLoadDraw(false)
    }

    async function trueSetLoadDraw() {
        setLoadDraw(false)
        if (drawArray.length == 0) {
            startDraw()
            getDraw()
            console.log(1)
        }
        setTimeout(() => {
            setLoadDraw(true)
        }, 1000)

        updateTable()
    }

    const [loadDraw, setLoadDraw] = useState(false)

    function oncl() {
        console.log(chosenWeightGender.label)
        console.log(drawArray)
    }

    return (<div>
        <SelectWeight choosen={''} weights={competitionInfo.weights} genders={competitionInfo.gendersName}
                      handleChange={setChosenWG}/>
        {chosenWeightGender !== '' ? <div>
            <DrawList extra={extra} weighingList={weighingList} updateTable={updateTable}/>
            <ButtonForm onClick={clearDraw}>Очистить жеребьёвку</ButtonForm>
            <ButtonForm onClick={oncl}>#debug#</ButtonForm>
            <ButtonForm onClick={trueSetLoadDraw}>Провести жеребьёвку</ButtonForm>
            {loadDraw == true ?
                <Drawing weight={chosenWeightGender.label} mode={modeDraw} extra={extra} updateTable={updateTable}
                         setLoadDraw={setLoadDraw} array={drawArray}/> : <BouncingDotsLoader/>}
        </div> : <div>Выбирите весовую категорию</div>}

    </div>);
};

export default Draw;