import React, { useEffect, useState } from 'react';
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
        });

    },[])

    const addLife = (junctionId, playerHp, matchId) => {
        playerHp ++;
        dispatch({
            type: 'EDIT_USER_HP',
            payload: {
                junctionId,
                playerHp,
                matchId
            }
        })
    }

    return (
        <>
            <div className='opponents_info'>
                {matchUsers.map((player) => {
                    if(player.user_id === user.id) {
                        return;
                    }
                    else {
                        return (
                            <div className='opponent' key={player.user_id}>
                                <h2>{player.username}</h2>
                                <h2>40 Life</h2>
                                {matchUsers.map((opponent) => {
                                    if(opponent.user_id === player.user_id) {
                                        return;
                                    }
                                    else {
                                        return (
                                            <h4 key={opponent.user_id}>{opponent.username} cdmg: 0</h4>
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
                {matchUsers.map((player) => {
                    if(player.user_id === user.id) {
                        return (
                            <div key={player.user_id} className='user_info'>
                                <h2>{player.username}</h2>
                                <div>
                                    <button className='add_btn'>+</button>
                                    <br/>
                                    <h3 >Poison: {player.poison}</h3>
                                    <br/>
                                    <button className='sub_btn'>-</button>
                                </div>
                                <div>
                                    <button
                                        className='add_life_btn'
                                        onClick={() => addLife(player.junction_id, player.hp, player.match_id)}
                                    >
                                        +
                                    </button>
                                    <br/>
                                    <h2 className='player_life'>{player.hp} Life</h2>
                                    <br/>
                                    <button className='sub_life_btn'>-</button>
                                </div>
                            </div>
                        )
                    }
                    else {
                        return;
                    }
                })}   
        </>
    )
};
export default Match;