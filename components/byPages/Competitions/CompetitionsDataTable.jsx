import React from 'react';
import CompetitionItem from "./CompetitionItem";

const CompetitionsDataTable = ({CompetitionsData, updateTable, settings, patchCompetition}) => {
    return (
        <div className="competitions-data-table">
            {CompetitionsData.map((Competition) => <CompetitionItem patchCompetition={patchCompetition} settings={settings} CompetitionInfo={Competition} key={Competition.extra} updateTable = {updateTable}/>)}
        </div>
    );
};

export default CompetitionsDataTable;