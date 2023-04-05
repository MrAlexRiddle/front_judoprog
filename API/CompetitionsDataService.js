import axios from "axios";

export default class CompetitionsDataService {
    static async getCompetitionsData() {
        const list = await axios.get('http://localhost:4444/competitions')
        return (list.data)
    }

    static async deleteComp(extra) {
        const list = await axios.delete('http://localhost:4444/competitions/' + extra)
        return (list.status)
    }

    static async postComp(info) {
        const list = await axios.post('http://localhost:4444/competitions', info)
        return (list.data)
    }

    static async patchComp(info, edit) {
        const list = await axios.patch('http://localhost:4444/competitions/' + edit.extra, info)
        return (list.data)
    }

    static async getOne(extra) {
        const list = await axios.get('http://localhost:4444/competitions/' + extra)
        return (list.data)
    }

    static async weighingByWeight(extra) {
        const list = await axios.get('http://localhost:4444/competitions/' + extra + '/weights')
        return (list.data)
    }

    static async deleteFromWeight(extra, data) {
        const list = await axios.delete('http://localhost:4444/competitions/' + extra + '/weights?person=' + data.idPerson + '&weight=' + data.weightGender)
        return (list.data)
    }

    static async addInWeight(extra, info) {
        const list = await axios.post('http://localhost:4444/competitions/' + extra + '/weights', info)
        return (list.data)
    }

    static async patchInWeight(extra, data, info) {
        const list = await axios.patch('http://localhost:4444/competitions/' + extra + '/weights?person=' + data.personId + '&weight=' + data.weightGender, info)
        return (list.data)
    }

    static async setStrength(extra, data, info) {
        const list = await axios.patch('http://localhost:4444/competitions/' + extra + '/weights/strength?person=' + data.personId + '&weight=' + data.weightGender, info)
        return (list.data)
    }

    static async createDrawByWeight(extra, weight, mode) {
        const list = await axios.post('http://localhost:4444/competitions/' + extra + '/draw?weight=' + weight + '&mode=' + mode)
        return (list.data)
    }

    static async getDraw(extra, weight) {
        const list = await axios.get('http://localhost:4444/competitions/' + extra + '/draw?weight=' + weight)
        return (list.data)
    }

    static async patchDraw(extra, weight, mode, info) {
        const list = await axios.patch('http://localhost:4444/competitions/' + extra + '/draw?weight=' + weight + '&mode=' + mode, {info:info})
    }

    static async clearDraw(extra, weight) {
        const list = await axios.delete('http://localhost:4444/competitions/' + extra + '/draw?weight=' + weight)

    }

}
