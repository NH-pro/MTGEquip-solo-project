import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';


function HistoryNotes() {
    const history = useHistory();
    const dispatch = useDispatch();
    const matchId = useParams();
    const notes = useSelector((store) => store.notesReducers.matchNotes);


    useEffect(() => {
        dispatch({
            type: 'FETCH_MATCH_NOTES',
            payload: matchId
        })
    }, [])

    // function deleteNote(noteId) {
    //     dispatch({
    //         type: 'DELETE_NOTE',
    //         payload: noteId
    //     });
    // }

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
                                {/* <button onClick={() => deleteNote(singleNote.id)} >Delete Note</button> */}
                            </div>
                        )
                    })}
                    <br/>
                    <button>Add Note</button>
                </div>
            }
            <button  onClick={() => history.goBack()}>Back</button>
        </>
    )
}
export default HistoryNotes;