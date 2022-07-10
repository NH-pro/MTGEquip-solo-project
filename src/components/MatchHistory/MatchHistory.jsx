import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";

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

        // dispatch({
        //     type: 'FETCH_MATCH_NOTES',
        //     payload: user.id
        // })
    },[])

    return (
        <>
            {actualHistory &&
                <div>
                    {actualHistory.matchHistory.map((match) => {
                        return (
                            <div key={match.id}>
                                <h2>{match.id}</h2>
                                <h2>{match.date}</h2>
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