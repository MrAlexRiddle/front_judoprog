export function searchValue(arr, label) {
    let i = 0
    let value
    while (i < arr.length) {
        if (arr[i].label === label) {
            value = arr[i].value
            break
        }
        i += 1
    }
    return value
}

export async function arrayConverter(arr) {
    let i = 0
    let mass = []
    let info = {label: '', value: 0}
    while (i < arr.length) {
        info.value = +Object.values(arr[i])[0]
        info.label = Object.values(arr[i])[1]
        mass.push(info)
        info = {label: '', value: 0}
        i += 1
    }
    return (mass)
}

export async function arrayConverter2(arr) {
    let i = 0
    let mass = []
    let info = {label: '', value: 0}
    while (i < arr.length) {
        info.value = +Object.values(arr[i])[0]
        info.label = Object.values(arr[i])[2]
        mass.push(info)
        info = {label: '', value: 0}
        i += 1
    }
    return (mass)
}

export function arrayConverterAutoValue(arr) {
    let i = 0
    let mass = []
    let info = {label: '', value: 0}
    while (i < arr.length) {
        info.value = +i
        info.label = arr[i]
        mass.push(info)
        info = {label: '', value: 0}
        i += 1
    }
    return (mass)
}

export async function arrayConverterExtra(arr) {
    let i = 0
    let mass = []
    let info = {label: '', value: 0, extra: ''}
    while (i < arr.length) {
        info.value = +Object.values(arr[i])[0]
        info.label = Object.values(arr[i])[1]
        info.extra = Object.values(arr[i])[2]
        mass.push(info)
        info = {label: '', value: 0, extra: ''}
        i += 1
    }
    return (mass)
}