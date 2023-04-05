import moment from "moment/moment";

export function PersonDataSearch(searchQuery, sortedPersonsData) {
    let buff = sortedPersonsData
    if (searchQuery) {
        if (searchQuery.dateBirth) {
            buff = buff.filter(data => moment(data.dateBirth, "DD.MM.YYYY").format('YYYY-MM-DD').includes(searchQuery.dateBirth))
        }
        if (searchQuery.gender) {
            buff = buff.filter(data => data.genderName.includes(searchQuery.gender.label))
        }
        if (searchQuery.locationCity) {
            buff = buff.filter(data => data.locationCityName.includes(searchQuery.locationCity.label))
        }
        if (searchQuery.locationRegion) {
            buff = buff.filter(data => data.locationRegionName.includes(searchQuery.locationRegion.label))
        }
        if (searchQuery.department) {
            buff = buff.filter(data => data.departmentName.includes(searchQuery.department.label))
        }
        if (searchQuery.organization) {
            buff = buff.filter(data => data.organizationName.includes(searchQuery.organization.label))
        }
        if (searchQuery.refereeRank) {
            buff = buff.filter(data => data.refereeRankName.includes(searchQuery.refereeRank.label))
        }
        if (searchQuery.athleteRank) {
            buff = buff.filter(data => data.athleteRankName.includes(searchQuery.athleteRank.label))
        }
        if (searchQuery.qualifyDegree) {
            buff = buff.filter(data => data.qualifyDegreeName.includes(searchQuery.qualifyDegree.label))
        }
        return buff
            .filter(data => data.surname.toLowerCase().includes(searchQuery.surname.toLowerCase()))
            .filter(data => data.name.toLowerCase().includes(searchQuery.name.toLowerCase()))
    } else {
        return buff
    }
}