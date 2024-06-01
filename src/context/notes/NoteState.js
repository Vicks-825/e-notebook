import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = 'http://localhost:8000';
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);
    //Fetch all notes
    const getNotes = async() =>{
        //API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            }
          });
          const json = await response.json();
          //console.log(json);
          setNotes(json);
    }

    //Add a note
    const addNote = async(title, description, details) =>{
        //API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, details})
          });
          const note = await response.json();
          setNotes(notes.concat(note));
    }

    //Edit a note
    const editNote = async(id, title, description, details) =>{
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, details})
          });
          const json = await response.json();
          console.log(json);

        //logic for client side
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            
            if(element._id === id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].details = details;
                break;
            }
        }
        setNotes(newNotes);
    }

    //delete a note
    const deleteNote = async(id) =>{
        //API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            }
          });
          const json = await response.json();
          console.log(json);
          //setNotes(json);

        //console.log("deleting note with id" + id);
        const newNote = notes.filter((note)=> {return note._id !== id});

        setNotes(newNote);
    }

    return(
        <NoteContext.Provider value={{notes, addNote, editNote, deleteNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>

    )
}

export default NoteState