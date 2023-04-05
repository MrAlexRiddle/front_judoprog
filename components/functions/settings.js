import * as SettingsPersonService from "../../API/SettingsService";
import {arrayConverter, arrayConverter2, arrayConverterExtra} from "./usefulFunc";
import * as SettingsService from "../../API/SettingsService";
import CompetitionsDataService from "../../API/CompetitionsDataService";

export const GetSettingsPerson = async () => {
    let settingsPerson = {
        genderList: [],
        departmentList: [],
        organizationList: {},
        locationRegionList: {},
        locationCityList: {},
        refereeRankList: {},
        athleteRankList: {},
        qualifyDegreeList: {}
    }

    settingsPerson.genderList = await SettingsPersonService.gender()
    settingsPerson.departmentList = await SettingsPersonService.department()
    settingsPerson.organizationList = await SettingsPersonService.organization()
    settingsPerson.locationRegionList = await SettingsPersonService.locationRegion()
    settingsPerson.locationCityList = await SettingsPersonService.locationCity()
    settingsPerson.refereeRankList = await SettingsPersonService.refereeRank()
    settingsPerson.athleteRankList = await SettingsPersonService.athleteRank()
    settingsPerson.qualifyDegreeList = await SettingsPersonService.qualifyDegree()

    return (settingsPerson)
}

export const GetSettingsCompetition = async () => {

    let settings = {
        locationRegionList: {},
        locationCityList: {},
        agesList: [],
        gendersList: [],
        mainsList: {},
        personsList: {}
    }

    settings.agesList = (await arrayConverter(await SettingsService.agesGendersCmpt()))
    settings.gendersList = (await arrayConverter2(await SettingsService.agesGendersCmpt()))
    settings.locationCityList = (await SettingsService.locationCity())
    settings.locationRegionList = (await SettingsService.locationRegion())
    settings.mainsList = (await SettingsService.getMains())

    return(settings)
}