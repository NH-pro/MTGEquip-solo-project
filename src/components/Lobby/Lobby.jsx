import React, { useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function Lobby() {
    const dispatch = useDispatch();
    let matchId = useParams();
    const matchUsers = useSelector(store => store.userMatchReducer);

    useEffect(() => {
        dispatch({
            type: 'FETCH_MATCH_USERS',
            payload: matchId
        })
    }, [])

    return (
        <>
            <h2>Players in Lobby</h2>

            {matchUsers.map(player => {
                return (
                    <h3 key={player.id}>{player.username}</h3>
                )
            })}
            <button>Launch Game</button>
        </>
    )
}
export default Lobby;