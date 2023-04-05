import axios from "axios";
import {arrayConverter, arrayConverterExtra} from "../components/functions/usefulFunc";

export async function gender() {
    const list = await axios.get('http://localhost:4444/genders')
    return (await arrayConverter(list.data))
}

export async function department() {
    const list = await axios.get('http://localhost:4444/departments')
    return (await arrayConverter(list.data))
}

export async function organization() {
    const list = await axios.get('http://localhost:4444/organizations')
    return (await arrayConverter(list.data))
}

export async function locationRegion() {
    const list = await axios.get('http://localhost:4444/locationregions')
    return (await arrayConverter(list.data))
}

export async function locationCity() {
    const list = await axios.get('http://localhost:4444/locationcities')
    return (await arrayConverter(list.data))
}

export async function refereeRank() {
    const list = await axios.get('http://localhost:4444/refereeranks')
    return (await arrayConverter(list.data))
}

export async function athleteRank() {
    const list = await axios.get('http://localhost:4444/athleteranks')
    return (await arrayConverter(list.data))
}

export async function qualifyDegree() {
    const list = await axios.get('http://localhost:4444/qualifydegrees')
    return (await arrayConverter(list.data))
}

export async function agesGendersCmpt() {
    const list = await axios.get('http://localhost:4444/ages')
    return (list.data)
}

export async function getMains() {
    const list = await axios.get('http://localhost:4444/for-competitions/mains')
    return (await arrayConverterExtra(list.data))
}
export async function getPersonsFIO() {
    const list = await axios.get('http://localhost:4444/for-competitions/fio')
    return (await arrayConverterExtra(list.data))
}