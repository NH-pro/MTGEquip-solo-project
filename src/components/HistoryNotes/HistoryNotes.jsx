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

    return (
        <>
            {notes && 
                <div>
                    {notes.map((singleNote) => {
                        return (
                            <div key={singleNote.id}>
                                <p>{singleNote.note}</p>
                            </div>
                        )
                    })}
                </div>
            }
            <button  onClick={() => history.goBack()}>Back</button>
        </>
    )
}
export default HistoryNotes;