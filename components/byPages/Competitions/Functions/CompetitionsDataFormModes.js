import moment from "moment/moment";
import {searchValue} from "../../../functions/usefulFunc";

export function patchMode(setVarMode, competitionInfoEdit, setCompetitionInfo, settings) {
    console.log(settings)
    console.log(competitionInfoEdit)
    setVarMode({
        button: 'Изменить соревнование',
        title: 'Форма изменения соревнования',
        style: {textAlign: 'center', marginBottom: '20px'}
    })
    if (moment(competitionInfoEdit.startDate, "DD.MM", true).isValid()) {
        competitionInfoEdit.startDate = moment(competitionInfoEdit.endDate, "DD.MM.YYYY").format('YYYY') + '-' + moment(competitionInfoEdit.startDate, "DD.MM").format('MM-DD')
    }
    if (moment(competitionInfoEdit.endDate, "DD.MM.YYYY", true).isValid()) {
        competitionInfoEdit.endDate = moment(competitionInfoEdit.endDate, "DD.MM.YYYY").format('YYYY-MM-DD')
    }
    setCompetitionInfo({
        name: competitionInfoEdit.name,
        startDate: competitionInfoEdit.endDate,
        endDate: competitionInfoEdit.endDate,
        locationRegion: settings.locationRegionList[searchValue(settings.locationRegionList, competitionInfoEdit.locationRegionName)],
        locationCity: settings.locationCityList[searchValue(settings.locationCityList, competitionInfoEdit.locationCityName)],
        weights: competitionInfoEdit.weights,
        ages: settings.agesList[searchValue(settings.agesList, competitionInfoEdit.agesName)],
        mainJudge: settings.mainsList[searchValue(settings.mainsList, competitionInfoEdit.mainJudge)],
        mainSecretary: settings.mainsList[searchValue(settings.mainsList, competitionInfoEdit.mainSecretary)],
    })
}

export function postMode(setVarMode) {
    setVarMode({
        button: 'Добавить соревнование', title: 'Форма добавления соревнования', style: {}
    })
}