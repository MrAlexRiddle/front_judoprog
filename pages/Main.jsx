import React from 'react';

function Main () {
    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            <a href={"/about"}>About</a>
            <a href={"/persons"}>Persons</a>
            <a href={"/competitions"}>Competitions</a>
        </div>
    );
};

export default Main;