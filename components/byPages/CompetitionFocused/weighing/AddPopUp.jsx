import React, {useEffect, useRef, useState} from 'react';
import Popup from "reactjs-popup";
import ButtonForm from "../../../UI/Buttons/ButtonForm";
import AddPersonInWeighing from "./AddPersonInWeighing";
import CompetitionsDataService from "../../../../API/CompetitionsDataService";
import PersonDataService from "../../../../API/PersonDataService";
import SelectWeight from "./SelectWeight";

const AddPopUp = ({GenderWeight, extra, updateTable, allSettingsPerson, personsList, weights, genders, flag}) => {
    const ref = useRef()
    const closeTooltip = () => ref.current.close()
    const [chosen, setChosen] = useState('')
    useEffect(() => {
        setChosen(GenderWeight)
    }, [GenderWeight])

    async function postPerson(personInfo, setPersonInfo) {
        const list = PersonDataService.postPerson(personInfo)
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
        list.toString()
        return list
    }

    async function addInWeight(personId, weight, trainers) {
        function selectExtraTrainers(arr) {
            let i = 0
            let string = ''
            while (i < arr.length) {
                string += arr[i].extra
                if (i !== arr.length - 1) {
                    string += ' '
                }
                i += 1
            }
            return string
        }

        const data = {
            weightGender: weight.label, idPerson: personId, trainerId: selectExtraTrainers(trainers)
        }
        console.log(data)
        await CompetitionsDataService.addInWeight(extra, data)

    }

    async function postAndAddPerson(weight, personInfo, setPersonInfo, trainers) {
        await addInWeight(await postPerson(personInfo, setPersonInfo), weight, trainers)
    }

    async function patchPerson(extra, personInfo) {
        const personInfoEdit = {extra: extra}
        const list = PersonDataService.patchPerson(personInfo, personInfoEdit)
    }

    async function patchAndAddPerson(extra, personInfo, weight, trainers) {
        await addInWeight(extra, weight, trainers)
        await patchPerson(extra, personInfo)
    }

    async function addPerson(weight, personInfo, setPersonInfo, trainers, flag) {
        if (flag === true) {
            await postAndAddPerson(weight, personInfo, setPersonInfo, trainers)
            updateTable()
        } else {
            await patchAndAddPerson(personInfo.extra, personInfo, weight, trainers)
            updateTable()
        }
        updateTable()
    }

    function changeGender(gweight) {
        setChosen(gweight)
    }

    return (<div className='post-and-add'>
        <Popup trigger={<ButtonForm style={{width: "100%"}}>Добавить в список</ButtonForm>}
               modal
               ref={ref} nested>

            <div style={{
                background: "lightgrey",
                padding: "20px 10px",
                borderRadius: "3px",
                boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                margin: "2px"
            }}>
                <SelectWeight chosen={chosen} weights={weights} genders={genders} handleChange={changeGender}
                              flag={flag}/>
                {chosen !== '' ? <AddPersonInWeighing settings={allSettingsPerson} onClickFunction={addPerson}
                                                      closeTooltip={closeTooltip} weight={chosen}
                                                      personsList={personsList} mode={0}/> :
                    <div>Выбирите весовую категорию</div>}

            </div>
        </Popup>
    </div>);
};

export default AddPopUp;