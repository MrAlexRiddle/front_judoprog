import axios from "axios";

export default class PersonDataService {
    static async getPersonsData() {
        const personsList = await axios.get('http://localhost:4444/persons')
        return (personsList.data)
    }

    static async getPerson(extra) {
        const personList = await axios.get('http://localhost:4444/person/' + extra)
        return (personList.data)
    }

    static async patchPerson(personInfo, personInfoEdit) {
        const list = await axios.patch('http://localhost:4444/persons/' + personInfoEdit.extra, {
            surname: personInfo.surname != '' ? personInfo.surname : '',
            name: personInfo.name != '' ? personInfo.name : '',
            secName: personInfo.secName != '' ? personInfo.secName : '',
            dateBirth: personInfo.dateBirth != '' ? personInfo.dateBirth : '',
            gender: personInfo.gender != '' ? personInfo.gender.value : '',
            department: personInfo.department != '' ? personInfo.department.value : '',
            organization: personInfo.organization != '' ? personInfo.organization.value : '',
            locationRegion: personInfo.locationRegion != '' ? personInfo.locationRegion.value : '',
            locationCity: personInfo.locationCity != '' ? personInfo.locationCity.value : '',
            refereeRank: personInfo.refereeRank != '' ? personInfo.refereeRank.value : '',
            athleteRank: personInfo.athleteRank != '' ? personInfo.athleteRank.value : '',
            qualifyDegree: personInfo.qualifyDegree != '' ? personInfo.qualifyDegree.value : ''
        })
        return (list.data)
    }

    static async postPerson(personInfo) {
        const list = await axios.post('http://localhost:4444/persons', {
            surname: personInfo.surname != '' ? personInfo.surname : '',
            name: personInfo.name != '' ? personInfo.name : '',
            secName: personInfo.secName != '' ? personInfo.secName : '',
            dateBirth: personInfo.dateBirth != '' ? personInfo.dateBirth : '',
            gender: personInfo.gender != '' ? personInfo.gender.value : '',
            department: personInfo.department != '' ? personInfo.department.value : '',
            organization: personInfo.organization != '' ? personInfo.organization.value : '',
            locationRegion: personInfo.locationRegion != '' ? personInfo.locationRegion.value : '',
            locationCity: personInfo.locationCity != '' ? personInfo.locationCity.value : '',
            refereeRank: personInfo.refereeRank != '' ? personInfo.refereeRank.value : '',
            athleteRank: personInfo.athleteRank != '' ? personInfo.athleteRank.value : '',
            qualifyDegree: personInfo.qualifyDegree != '' ? personInfo.qualifyDegree.value : ''
        })
        return (list.data)
    }
    static async deletePerson(extra) {
        const list = await axios.delete('http://localhost:4444/persons/' + extra)
        return (list.status)
    }
}