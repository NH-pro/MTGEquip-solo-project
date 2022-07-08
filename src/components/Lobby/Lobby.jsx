import React, { useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

function Lobby() {
    const history = useHistory();
    const dispatch = useDispatch();
    let matchId = useParams();
    const matchUsers = useSelector(store => store.userMatchReducer);

    useEffect(() => {
        dispatch({
            type: 'FETCH_MATCH_USERS',
            payload: matchId
        })
    }, [])

    const launchMatch = () => {
        history.push(`/match/${matchId.matchId}`);
    }

    return (
        <>
            <h2>Players in Lobby</h2>

            {matchUsers.map(player => {
                return (
                    <h3 key={player.junction_id}>{player.username}</h3>
                )
            })}
            {matchUsers.length >= 2 &&
                <button onClick={() => launchMatch()}>Launch Game</button>
            }
        </>
    )
}
export default Lobby;