import React, { useContext } from 'react'
import { AlertContext } from './../context/alert/alertContext';
import { FirebaseContext } from './../context/firebase/firebaseContext';


export const Notes = ({ notes }) => {

    const alert = useContext(AlertContext)
    const { removeNote } = useContext(FirebaseContext)

    const onRemove = (id) => {
        removeNote(id)
                
        if (onRemove) {
            alert.show('Note deleted')
        } 
    }

    return (
    <ul className="list-group">
        {notes.map(note => (
            <li 
                className="list-group-item note"
                key={note.id}
            >
                <div>
                    <strong>{note.title}</strong>
                    <small>
                        {note.date}
                    </small>
                </div>

                <button
                    type="button" 
                    className="btn btn-outline-danger btn-sm"
                    onClick={()=>onRemove(note.id)}
                >
                    &times;
                </button>
            </li>
        ))}
    </ul>
)}