import React from 'react';
import studentsJSON from '../sample.json';

export default function SideBar(props) {
  function onClick() {
    const mapStudentsJSON = Object.values(studentsJSON).map(({ name, surname }, index) => ({ //using index to create unique IDs instead of nano-id; subject to change later
      'id': 'student-' + index,
      'id2': 'student2-' + index,
      'undoValue': name,
      'undoValue2': surname,
    }));
    props.studentsCallback(mapStudentsJSON);
  }
  function displayList(e) {
    const studentArray =  Object.values(e.target.dataset.list);
    const mapStudentsJSON = Object.values(studentArray).map(({ name, surname }, index) => ({
      'id': 'student-' + index,
      'id2': 'student2-' + index,
      'undoValue': name,
      'undoValue2': surname,
    }));
    props.studentsCallback(mapStudentsJSON);
  }
  return (
    <div className='side-bar'>
      <h2>Saved lists will appear below</h2>
      <button className='blue-green' onClick={onClick}>
        Load sample
      </button>
      <ul>
        {props.studentLists.map((l, index) => (
          <li key={index}>
            Saved list {index}
            <button className='blue-green' onClick={displayList} data-list={l}>
              Display List
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
