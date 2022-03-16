import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import List from './components/List';
import Form from './components/Form';
import { nanoid } from 'nanoid';
import SideBar from './components/SideBar';

function App() {
  const [name, setName] = useState(localStorage.name);
  const studentArray = [];
  const [entry, setEntry] = useState(studentArray);
  const [isAddingNew, setAddingNew] = useState(false);
  const [isDeleted, setDeleted] = useState(false);
  const [undoId, setUndoId] = useState('');
  const [undoId2, setUndoId2] = useState('');
  const [undoValue, setUndoValue] = useState('');
  const [undoValue2, setUndoValue2] = useState('');
  const [undoPos, setUndoPos] = useState('');
  const [saveEntry, setSaveEntry] = useState([]);
  const [studentLists, setStudentLists] = useState([]);

  function nameCallback(name) {
    setName(name);
  }

  const mapArray = entry.map((entry) => (
    <List
      id={entry.id}
      id2={entry.id2}
      key={entry.id}
      undoValue={entry.undoValue}
      undoValue2={entry.undoValue2}
      visibility={entry.visibility}
      createNew={createNew}
      deleteEntry={deleteEntry}
      recordEntries={recordEntries}
    />
  ));

  function createNew() {
    const newEntry = {
      id: 'student-' + nanoid(),
      id2: 'student-' + nanoid(),
      visibility: 'visible',
      undoValue: '',
      undoValue2: '',
    };
    setEntry([...entry, newEntry]);
    setAddingNew(true);
  }

  function close() {
    if (window.confirm('Are you sure you want to discard all changes?')) {
      setEntry([]);
      setAddingNew(false);
    }
  }

  function deleteEntry(id, id2, v, v2) {
    const remainingEntries = entry.filter((entry) => id !== entry.id);
    const deletedEntry = entry.filter((entry) => id === entry.id);

    const remainingRecEntries = saveEntry.filter((entry) => id !== entry.id);
    setSaveEntry(remainingRecEntries);

    for (let i = 0; i < entry.length; i++) {
      if (entry[i].id === deletedEntry[0].id) setUndoPos(i);
    }

    setEntry(remainingEntries);
    if (remainingEntries.length === 0) setAddingNew(false);
    setUndoId(id);
    setUndoId2(id2);
    setUndoValue(v);
    setUndoValue2(v2);
    setDeleted(true);
  }

  const undoElement = (
    <button className='undo' onClick={undoEntry}>
      ⎌
    </button>
  );

  function undoEntry() {
    //ensuring that only one ➕ icon is visible at a time
    let vis = 'visible';
    for (let i = 0; i < entry.length; i++) {
      if (entry[i].visibility === 'visible') vis = 'hidden';
    }

    const reinstatedEntry = { id: undoId, id2: undoId2, visibility: vis, undoValue: undoValue, undoValue2: undoValue2 };
    let arr2 = [...entry];
    arr2.splice(undoPos, 0, reinstatedEntry);
    setEntry(arr2);

    let arr3 = [...saveEntry];
    arr3.splice(undoPos, 0, reinstatedEntry);
    setSaveEntry(arr3);
    setDeleted(false);
  }

  function recordEntries(id, id2, v, v2) {
    const savedEntry = { id: id, id2: id2, undoValue: v, undoValue2: v2 };
    setSaveEntry([...saveEntry, savedEntry]);
  }

  function exportDb() {
    let myDb = '';
    for (let i = 0; i < saveEntry.length; i++) {
      myDb += saveEntry[i].undoValue + '%20' + saveEntry[i].undoValue2 + ' ';
      myDb += '%0A';
    }

    let downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);
    downloadLink.href = 'data:application/vnd.ms-excel, ' + myDb;
    downloadLink.click();
  }

  function openDb() {
    //
  }

  function saveDb() {
    const list = document.querySelectorAll('.student-list');
    const savedJSON = {};
    Array.from(list).forEach((x, index) => {
      savedJSON[index+1] = {name: x.children[0].value, surname: x.children[1].value};
    });
    setStudentLists([...studentLists, savedJSON]);
  }

  function test() {
    //
  }

  function __restoreEntries() {
    setEntry(saveEntry);
  }

  function studentsCallback(students) {
    setEntry(students);
  }

  return (
    <div className='student-book'>
      <header className='welcome'>
        <h1>Welcome {name}</h1>
        <Form nameCallback={nameCallback} />
      </header>
      <SideBar studentsCallback={studentsCallback} studentLists={studentLists} />
      <main>
        <h1>Fill in student names or choose existing</h1>
        <ol>
          {mapArray}
          {isDeleted ? undoElement : ''}
        </ol>
        <div>
          <button type='submit' onClick={() => (!isAddingNew ? createNew() : saveDb())}>
            {isAddingNew ? 'Save' : 'New'}
          </button>
          {isAddingNew ? (<button onClick={exportDb}>Download</button>) : ''}
          <button type='submit' onClick={() => (isAddingNew ? close() : openDb())}>
            {isAddingNew ? 'Close' : 'Open'}
          </button>
        </div>
        <div className='controls'>
          <p> Controls </p>
          <button type='submit' onClick={__restoreEntries}>
            __Restore
          </button>
          <button onClick={test}>__Test</button>
          <button type='submit'>__Check</button>
        </div>
      </main>
    </div>
  );
}

export default App;
