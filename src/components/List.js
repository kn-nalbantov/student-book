import React, { useState } from 'react';

export default function List(props) {
    const [value, setValue] = useState(props.undoValue);
    const [value2, setValue2] = useState(props.undoValue2);
    const [hideIcon, setHideIcon] = useState(props.visibility);


    function handleChange(e) {
        setValue(e.target.value);
    }

    function handleChange2(e) {
        setValue2(e.target.value);
    }

    return (
        <li className="student-list">
            <input className="names" type="text" placeholder="name" 
            id={props.id} key={props.id}
            value={value}
            onChange={handleChange}
            ></input>
            <input className="names" type="text" placeholder="surname"
            id={props.id2}
            value={value2}
            onChange={handleChange2}
            ></input>
            <button onClick={(value !== '' && value2 !== '') ? () => {props.createNew(); setHideIcon('hidden'); props.recordEntries(props.id, props.id2, value, value2)} : () => {alert('Please enter a student name')}} 
            className="add" style={{visibility: hideIcon}}>➕</button>
            <button onClick={() => props.deleteEntry(props.id, props.id2, value, value2)} className="delete">🗑️</button>
        </li>
    );
}











