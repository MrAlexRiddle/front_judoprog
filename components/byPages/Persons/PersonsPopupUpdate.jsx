import React, {useRef} from 'react';
import Popup from "reactjs-popup";
import PersonInteractiveForm from "./PersonInteractiveForm";
import ButtonForm from "../../UI/Buttons/ButtonForm";

const PersonsPopupUpdate = (props) => {
    const ref = useRef()
    const closeTooltip = () => ref.current.close()

    return (
        <Popup
            ref={ref}
            trigger={<ButtonForm style={{height: 'auto', padding:'1px'}}>Изменить</ButtonForm>}
            modal
            nested
        >
            <div style={{background:"lightgrey", padding: "20px 10px", borderRadius: "3px", boxShadow: "0 0 10px rgba(0,0,0,0.5)"}}>
                <PersonInteractiveForm settingsPerson={props.settingsPerson} personInfoEdit={props.personInfoEdit}
                                       onClickFunction={props.putchPerson} closeTooltip={closeTooltip} mode={1}/>
            </div>
        </Popup>);
};

export default PersonsPopupUpdate;