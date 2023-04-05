import React from 'react';
import DrawRow from "./DrawRow";

const DrawList = ({extra, weighingList, updateTable}) => {
    let strength = []
    let countItems = {}
    let maxStrengthCount = 0
    weighingList.map(e => strength.push(e.strength))
    if(weighingList.length <= 8) {
        maxStrengthCount = 2
    }
    if(weighingList.length > 8) {
        maxStrengthCount = 4
    }
    for (const item of strength) {
        countItems[item] = countItems[item] ? countItems[item] + 1 : 1;
    }
    const result = Object.keys(countItems).filter((item) => countItems[item] >= maxStrengthCount);
    const res = result.map(function(item, index, arr) {
        let number = parseInt(item);
        return isNaN(number)? item : number;
    })
    const strengthArr = [1, 2, 3, 4, 5]
    let strengthDifference = strengthArr.filter(el_A => !res.includes(el_A));
    strengthDifference.unshift(0)

    return (<div className='table-weighing'>
            <table>
                <thead>
                <tr>
                    <td className="strength">Коэфициент силы</td>
                    <td className="fio">Фамилия Имя Отчество</td>
                    <td className="dateBirth">Дата рождения</td>
                    <td className="department">СДО</td>
                    <td className="locationRegion">Регион</td>
                    <td className="locationCity">Город</td>
                    <td className="athleteRank">Разряд</td>
                    <td className="trainers">Тренер(ы)</td>
                </tr>
                </thead>
                <tbody className='body'>
                {weighingList.map((e) => <DrawRow e={e} key={e.key} extra={extra} strengthArr={strengthDifference} updateTable={updateTable}/>)}
                </tbody>
            </table>
        </div>

    );

};

export default DrawList;