import React, { useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './Match.css';

function Match({player}) {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const matchUsers = useSelector(store => store.userMatchReducer);
    let matchId = useParams();


    useEffect(() => {
        dispatch({
            type: 'FETCH_MATCH_USERS',
            payload: matchId
        })
    },[])
    

    return (
        <>
            <div className='opponents_info'>
                {matchUsers.map((player) => {
                    if(player.user_id === user.id) {
                        return;
                    }
                    else {
                        return (
                            <div key={player.user_id}>
                                <h3>{player.username}</h3>
                                <h3>40 Life</h3>
                                {matchUsers.map((opponent) => {
                                    if(opponent.user_id === player.user_id) {
                                        return;
                                    }
                                    else {
                                        return (
                                            <h4>{opponent.username} cdmg: 0 Dmg</h4>
                                        )
                                    }
                                })}
                                <h4>posion: {player.poison}</h4>
                                <div>
                                    <button className='add_btn'>+</button>
                                    <br/>
                                    <h3 className='cdmg'>{player.username} cdmg: 0</h3>
                                    <br/>
                                    <button className='sub_btn'>-</button>
                                </div>
                            </div>
                        );
                    }
                })} 
            </div>
            <div className='user_info'>
                <h3>{user.username}</h3>
                <div>
                    <button className='add_btn'>+</button>
                    <br/>
                    <h3 >Poison: 0</h3>
                    <br/>
                    <button className='sub_btn'>-</button>
                </div>
                <div>
                    <button className='add_life_btn'>+</button>
                    <br/>
                    <h2 className='player_life'>40 Life</h2>
                    <br/>
                    <button className='sub_life_btn'>-</button>
                </div>
            </div>
        </>
    )
};
export default Match;