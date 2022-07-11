import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";
import moment from 'moment';
import './MatchHistory.css'

function MatchHistory() {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const actualHistory = useSelector((store) => store.notesReducers.matchHistory)

    useEffect(() => {
        dispatch({
            type: "FETCH_MATCH_HISTORY",
            payload: {
                user: user.id
            }
        })
    },[])

    function matchNotes(matchId) {
        history.push(`/historyDetails/${matchId}`)
    }

    return (
        <>
            <button  onClick={() => history.goBack()}>Back</button>
            {actualHistory &&
                <div className="history_list">
                    {actualHistory.matchHistory.map((match) => {
                        return (
                            <div key={match.id} onClick={() => matchNotes(match.id)} className="history_match" >
                                <h2>Match Id #{match.id}</h2>
                                <h2>{moment(match.date).format('MM/DD/YYYY')}</h2>
                            </div>
                        )
                    })}
                </div>
            }
            <button  onClick={() => history.goBack()}>Back</button>
        </>
    )
}

export default MatchHistory;