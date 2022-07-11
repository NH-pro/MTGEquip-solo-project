import React, { useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Grow } from '@mui/material';

function Lobby() {
    const history = useHistory();
    const dispatch = useDispatch();
    let matchId = useParams();
    const matchUsers = useSelector(store => store.userMatchReducer);
    const matchInfo = useSelector(store => store.matchReducer);
    const user = useSelector(store => store.user);

    useEffect(() => {
        dispatch({
            type: 'FETCH_MATCH_USERS',
            payload: matchId
        })
        dispatch({
            type: 'FETCH_MATCH_INFO',
            payload: matchId
        })
    }, [])

    const launchMatch = () => {
        if(user.id === matchInfo.creator_id) {
            // Loop through every player in the match.
            for (let player of matchUsers) {
                // Loop through every player in the match again.
                for (let oppPlayer of matchUsers) {
                    // Exclude the original player from the first loop.
                    if(player.user_id !== oppPlayer.user_id) {
                        // Info being sent with dispatch.
                        let commanderDamageJunc = {
                            matchId: player.match_id,
                            attackerId: oppPlayer.user_id,
                            defenderId: player.user_id
                        };
                        // Dispatch to make new commander_damage_junction table rows
                        //  for each player and their opponent.                   
                        dispatch({
                            type: 'CREATE_COMMANDER_DMG_JUNCTIONS',
                            payload: commanderDamageJunc
                        })
                    }
                }
            }
        }
        history.push(`/match/${matchId.matchId}`);
    }

    return (
        <>
            {matchUsers &&
                <div>
                    <h2>Players in Lobby</h2>
                    {matchUsers.map(player => {
                        return (
                            <Grow>
                                <h3 key={player.junction_id}>{player.username}</h3>
                            </Grow>
                        )
                    })}
                    {matchUsers.length >= 2 &&
                        <button onClick={() => launchMatch()}>Launch Game</button>
                    }
                </div>
            }
        </>
    )
}
export default Lobby;