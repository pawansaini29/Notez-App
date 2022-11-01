import React, { useEffect, useState } from 'react';

import { NoteContainer } from './Component/NoteContainer/NoteContainer';
import { Sidebar } from './Component/Sidebar/Sidebar';

import './App.css';


function App() {

  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes-app")) || []   //use state hook
  );

  const addNote = (color) => {
    const tempNotes = [...notes];

    tempNotes.push({
      id: Date.now() + "" + Math.floor(Math.random() * 78), //function to add colors
      text: "",
      time: Date.now(),
      color,
    });
    setNotes(tempNotes);
  };

  const deleteNote = (id) => {
    const tempNotes = [...notes];

    const index = tempNotes.findIndex((item) => item.id === id); //function to deleteNote
    if (index < 0) return;

    tempNotes.splice(index, 1);
    setNotes(tempNotes);
  };

  const updateText = (text, id) => {
    const tempNotes = [...notes];

    const index = tempNotes.findIndex((item) => item.id === id);  //function to update text
    if (index < 0) return;

    tempNotes[index].text = text;
    setNotes(tempNotes);
  };

  useEffect(() => {
    localStorage.setItem("notes-app" , JSON.stringify(notes)); // re-renders when state changes 
  }, [notes]);

  // const [theme, setTheme]= useState("light-theme"); //dark mode
  // const toggleTheme = ()=>{
  //   if(theme==='dark-theme'){
  //     setTheme('light-theme')
  //   }else{
  //     setTheme('dark-theme');
  //   }

  // };
  //   useEffect(()=>{
  //     document.body.className = theme;
  //   },[theme]);

  return (
    <div className="App">
      <Sidebar addNote={addNote} />
      <NoteContainer
        notes={notes}
        deleteNote={deleteNote}
        updateText={updateText}
      />
      {/* <button className='toggle-btn' onClick={()=>toggleTheme()} >Dark Theme</button> */}
    </div>
  );
}

export default App;
