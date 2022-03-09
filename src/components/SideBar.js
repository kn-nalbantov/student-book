import React from 'react';
import studentsJSON from '../sample.json';

export default function SideBar(props) {
    function onClick() {
        const mapStudentsJSON = Object.values(studentsJSON).map(({name, surname}, index) => ({ //using index to create unique IDs instead of nano-id; subject to change later
            'id': 'student-' + index,
            'id2': 'student2-' + index,
            'undoValue': name,
            'undoValue2': surname
        }));
        console.log(mapStudentsJSON);
        props.studentsCallback(mapStudentsJSON);
    }
    function displayList(){
        console.log(props.studentLists);
    }
    return (
        <div className='side-bar'>
      <button onClick={onClick}>Load sample</button>
      <ul>
          {props.studentLists ? (<li>Saved list<button onClick={displayList}>Display List</button></li>) : ''}
      </ul>
    </div>
  );
}