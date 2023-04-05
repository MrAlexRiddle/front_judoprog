import React, {useRef} from 'react';
import Popup from "reactjs-popup";
import ButtonForm from "../../UI/Buttons/ButtonForm";
import CompetitionsDataForm from "./CompetitionsDataForm";

const CompetitionsPopupUpdate = (props) => {
    const ref = useRef()
    const closeTooltip = () => ref.current.close()

    return (<Popup
        ref={ref}
        trigger={<ButtonForm style={{width: "50%"}}>Изменить</ButtonForm>}
        modal
        nested
    >
        <div className="competitions-popup">
            <CompetitionsDataForm settings={props.settings} competitionInfoEdit={props.competitionInfoEdit}
                                  onClickFunction={props.patchCompetition} closeTooltip={closeTooltip} mode={1}/>
        </div>
    </Popup>);
};

export default CompetitionsPopupUpdate;