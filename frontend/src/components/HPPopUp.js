import React, {useState} from "react";
import "../css/HPPopUp.css";

// src: https://www.cluemediator.com/create-simple-popup-in-reactjs

const Popup = props => {

    const[newHP, setNewHP] = useState("");

    const[status, setStatus] = useState(0);

    function handleChange(event) {
        const {name, value} = event.target;
        if (name === "newHP") setNewHP(value);
    }

    function submitNewHP() {
        setStatus(0);
        try{
            if (newHP.length >= 1) {
                setStatus(props.handleSubmit(newHP));
                setNewHP("");
            } else {
                setStatus(3);
                throw "Invalid HodgePodge Name."
            }
        }
        catch(error){
            setStatus(2);
        }
        
    }

    return (
        <div className="popup-box">
        <div className="box">
            <span className="close-icon" onClick={props.handleClose}>x</span>
            <>
                <b>Create A New HodgePodge</b>
                <p>
                    <textarea
                        placeholder="HP name..."
                        type="text"
                        name="newHP"
                        id="newHP"
                        value={newHP}
                        onChange={handleChange}>
                    </textarea>
                </p>
                <button className='create-button' onClick={submitNewHP}>Create</button>
                {(status === 1) && <small>HodgePodge Created!</small>}
                {(status === 2) && <small>That Name Is Taken. Try A Different One.</small>}
                {(status === 3) && <small>Invalid HodgePodge name.</small>}
            </>
        </div>
        </div>
    );
};
 
export default Popup;