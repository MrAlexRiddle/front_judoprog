import React, {useEffect, useMemo, useRef, useState} from "react";
import '../styles/main.sass';
import '../styles/Persons.css'
import PersonDataTable from "../components/byPages/Persons/PersonDataTable";
import PersonInteractiveForm from "../components/byPages/Persons/PersonInteractiveForm";
import Popup from "reactjs-popup";
import ButtonForm from "../components/UI/Buttons/ButtonForm";
import SortSelect from "../components/UI/SortSelect/SortSelect";
import PersonSearchingForm from "../components/byPages/Persons/PersonSearchingForm";
import PersonDataService from "../API/PersonDataService";
import * as Filters from "../components/filters/PersonsSearchFilter";
import * as Sorts from "../components/sorts/PersonSort";
import BouncingDotsLoader from "../components/UI/BouncingDotsLoader/BouncingDotsLoader";
import {GetSettingsPerson} from "../components/functions/settings";

function Persons() {
    const ref = useRef()
    const closeTooltip = () => ref.current.close()
    const [personData, setPersonData] = useState([])
    const [isUpdate, setIsUpdate] = useState(Date.now())
    const [allSettingsPerson, setAllSettingsPerson] = useState({})
    const [selectedSort, setSelectedSort] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    async function setSettings() {
        setAllSettingsPerson(await GetSettingsPerson())
    }

    async function getPersons() {
        setIsLoading(true)
        setTimeout(async () => {
            setPersonData(await PersonDataService.getPersonsData())
            setIsLoading(false)
        }, 1000)
    }

    function updateTable() {
        setIsUpdate(Date.now())
    }

    useEffect(() => {
        getPersons()
    }, [isUpdate])
    useEffect(() => {
        setSettings()
    }, [])

    const sortedPersonsData = useMemo(() => Sorts.PersonDataSort(personData, selectedSort), [selectedSort, personData])

    const sortedAndSearchedPersonsData = useMemo(() => Filters.PersonDataSearch(searchQuery, sortedPersonsData), [searchQuery, selectedSort, personData])

    async function patchPerson(personInfoEdit, personInfo, setPersonInfo) {
        const list = PersonDataService.patchPerson(personInfo, personInfoEdit)
        updateTable()
        updateTable()
        console.log(list)
    }

    async function postPerson(personInfoEdit, personInfo, setPersonInfo) {
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
        updateTable()
        updateTable()
        console.log(list)
    }

    function sortPersons(typoSort) {
        setSelectedSort(typoSort)
    }

    return (<div className="Persons" style={{margin: "auto"}}>
        <div>
            <Popup trigger={<ButtonForm style={{width: "100%"}}>Добавить персону</ButtonForm>}
                   modal
                   ref={ref} nested>
                <div style={{
                    background: "lightgrey",
                    padding: "20px 10px",
                    borderRadius: "3px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.5)"
                }}>
                    <PersonInteractiveForm settingsPerson={allSettingsPerson} onClickFunction={postPerson}
                                           closeTooltip={closeTooltip} mode={0}/>
                </div>
            </Popup>
        </div>
        <PersonSearchingForm settingsPerson={allSettingsPerson} onChangeFunction={setSearchQuery}/>
        <div>
            <SortSelect value={selectedSort} onChange={sortPersons}
                        options={[{value: 'surname', label: 'Сортировать по фамилии '}, {
                            value: 'name', label: 'Сортировать по имени'
                        }, {value: 'secName', label: 'Сортировать по отчеству'}, {
                            value: 'genderName', label: 'Сортировать по полу'
                        }]}/>
        </div>
        {isLoading ? <BouncingDotsLoader/> :
            <PersonDataTable updateTable={updateTable} personData={sortedAndSearchedPersonsData}
                             putchPerson={patchPerson} settingsPerson={allSettingsPerson}/>

        }

    </div>);
}

export default Persons;
