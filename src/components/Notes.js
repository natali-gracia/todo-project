import React, { useContext } from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
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
        <TransitionGroup component="ul" className="list-group">
            {notes.map(note => (
                <CSSTransition 
                    key={note.id}
                    classNames={'note'}
                    timeout={800}
                >
                    <li className="list-group-item note">
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
                </CSSTransition>
            ))}
        </TransitionGroup>
    )}