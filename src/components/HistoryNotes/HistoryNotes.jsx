import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';


function HistoryNotes() {
    const history = useHistory();
    const dispatch = useDispatch();
    const matchId = useParams();
    const notes = useSelector((store) => store.notesReducers.matchNotes);
    const [newNote, setNewNote] = useState('');
    const matchUsers = useSelector(store => store.userMatchReducer);
    const user = useSelector((store) => store.user);



    useEffect(() => {
        dispatch({
            type: 'FETCH_MATCH_NOTES',
            payload: matchId
        })

        dispatch({
            type: 'FETCH_MATCH_USERS',
            payload: matchId
        });
    }, [])

    function deleteNote(noteId) {
        dispatch({
            type: 'DELETE_NOTE',
            payload: {
                noteId,
                matchId
            }
        })

    }

    function addNote() {
        for (let player of matchUsers) {
            if (player.user_id === user.id) {
                dispatch({
                    type: 'CREATE_MATCH_NOTE',
                    payload: {
                        note: newNote,
                        juncId: player.junction_id,
                        matchId
                    }
                })
            }
        }
    }

    return (
        <>
            {notes &&
                <div>
                    {notes.map((singleNote) => {
                        return (
                            <div key={singleNote.id}>
                                <textarea
                                    readOnly
                                    defaultValue={singleNote.note}
                                    rows="10"
                                    cols="40"
                                    maxLength="400"
                                />
                                <br />
                                <button onClick={() => deleteNote(singleNote.id)} >Delete Note</button>
                            </div>
                        )
                    })}
                </div>
            }
            <form onSubmit={() => addNote()}>
                <textarea
                    onChange={(event) => setNewNote(event.target.value)}
                    rows="10"
                    cols="40"
                    maxLength="400"
                />
                <br />
                <button type='submit'>Add Note</button>
            </form>
            <br />
            <button onClick={() => history.goBack()}>Back</button>
        </>
    )
}
export default HistoryNotes;