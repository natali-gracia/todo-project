import React, {useReducer} from 'react'
import axios from 'axios'
import { FirebaseContext } from './firebaseContext'
import { firebaseReducer } from './firebaseReducer'
import { SHOW_LOADER, REMOVE_NOTE, ADD_NOTE, FETCH_NOTES } from '../types'

export const FirebaseState = ({ children }) => {
    const initialState = {
        notes: [],
        loading: false
    }

    const [state, dispatch] = useReducer(firebaseReducer, initialState)

    const showLoader = () => dispatch({type: SHOW_LOADER})

    const fetchNotes = async () => {
        showLoader()
        const res = await axios.get('https://todoapp-react-hooks.firebaseio.com/notes.json')
        const payload = (
            res.data === null ? [] : Object.keys(res.data).map( key => {
                return {
                    ...res.data[key],
                    id: key
                }
            })
        )

        dispatch({type: FETCH_NOTES, payload})
    }

    const addNote = async title => {
        const note = {
            title, date: new Date().toJSON()
        }

        const res = await axios.post('https://todoapp-react-hooks.firebaseio.com/notes.json', note)
        const payload = {
            ...note,
            id: res.data.name
        }
        dispatch({type: ADD_NOTE, payload})
    }

    const removeNote = async id => {
        await axios.delete(`https://todoapp-react-hooks.firebaseio.com/notes/${id}.json`)

        dispatch({
            type: REMOVE_NOTE,
            payload: id
        })
    }

    return (
        <FirebaseContext.Provider value={{
            showLoader, addNote, removeNote, fetchNotes,
            loading: state.loading,
            notes: state.notes
        }}>
            { children }
        </FirebaseContext.Provider>
    )
}