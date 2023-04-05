import moment from "moment";
import {searchValue} from "../../../functions/usefulFunc";

export function patchMode(setVarMode, personInfoEdit, setPersonInfo, settingsPerson) {
        setVarMode({
            button: 'Изменить пользователя',
            title: 'Форма изменения персоны',
            style: {textAlign: 'center', marginBottom: '20px'}
        })
        if (moment(personInfoEdit.dateBirth, "DD.MM.YYYY", true).isValid()) {
            personInfoEdit.dateBirth = moment(personInfoEdit.dateBirth, "DD.MM.YYYY").format('YYYY-MM-DD')
        }
        setPersonInfo({
            surname: personInfoEdit.surname,
            name: personInfoEdit.name,
            secName: personInfoEdit.secName,
            dateBirth: personInfoEdit.dateBirth,
            gender: settingsPerson.genderList[searchValue(settingsPerson.genderList, personInfoEdit.genderName)],
            department: settingsPerson.departmentList[searchValue(settingsPerson.departmentList, personInfoEdit.departmentName)],
            organization: settingsPerson.organizationList[searchValue(settingsPerson.organizationList, personInfoEdit.organizationName)],
            locationRegion: settingsPerson.locationRegionList[searchValue(settingsPerson.locationRegionList, personInfoEdit.locationRegionName)],
            locationCity: settingsPerson.locationCityList[searchValue(settingsPerson.locationCityList, personInfoEdit.locationCityName)],
            refereeRank: settingsPerson.refereeRankList[searchValue(settingsPerson.refereeRankList, personInfoEdit.refereeRankName)],
            athleteRank: settingsPerson.athleteRankList[searchValue(settingsPerson.athleteRankList, personInfoEdit.athleteRankName)],
            qualifyDegree: settingsPerson.qualifyDegreeList[searchValue(settingsPerson.qualifyDegreeList, personInfoEdit.qualifyDegreeName)]
        })
}

export function postMode(setVarMode) {
    setVarMode({
        button: 'Добавить пользователя', title: 'Форма добавления персоны', style: {textAlign: 'center', marginBottom: '20px'}
    })
}