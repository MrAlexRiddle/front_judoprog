export function PersonDataSort(personData, selectedSort) {
    if (selectedSort) {
        return [...personData].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
    } else {
        return personData
    }
}