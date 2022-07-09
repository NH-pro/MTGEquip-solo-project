import React, { useEffect, useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './Match.css';

function Match() {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const matchUsers = useSelector(store => store.userMatchReducer);
    let matchId = useParams();
    const commDamage = useSelector(store => store.commDamageReducer);


    useEffect(() => {
        dispatch({
            type: 'FETCH_MATCH_USERS',
            payload: matchId
        });

        dispatch({
            type: 'FETCH_COMMANDER_DMG_INFO',
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
    const subLife = (junctionId, playerHp, matchId) => {
        playerHp --;
        dispatch({
            type: 'EDIT_USER_HP',
            payload: {
                junctionId,
                playerHp,
                matchId
            }
        })
    }

    const addPoison = (junctionId, playerPoison, matchId) => {
        playerPoison ++;
        dispatch({
            type: 'EDIT_USER_POISON',
            payload: {
                junctionId,
                playerPoison,
                matchId
            }
        })
    }

    const subPoison = (junctionId, playerPoison, matchId) => {
        playerPoison --;
        dispatch({
            type: 'EDIT_USER_POISON',
            payload: {
                junctionId,
                playerPoison,
                matchId
            }
        })
    }

    return (
        <>
            <div className='opponents_info'>
                {matchUsers.map((player) => {
                    if(player.user_id !== user.id) {
                        return (
                            <div className='opponent' key={player.user_id}>
                                <h2>{player.username}</h2>
                                <h2>{player.hp}</h2>
                                {matchUsers.map((opponent) => {
                                    if(opponent.user_id !== player.user_id) {
                                        return (
                                            <h4 key={opponent.user_id}>
                                                {opponent.username} cdmg: 
                                                {commDamage.map((comm) => {
                                                    if(comm.attacker_id === opponent.user_id && comm.defender_id === player.user_id) {
                                                        return (
                                                            comm.amount
                                                        )
                                                    }
                                                })}
                                            </h4>
                                        )
                                    }
                                })}
                                <h4>posion: {player.poison}</h4>
                                {commDamage.map((comm) => {
                                    if(comm.attacker_id === player.user_id && comm.defender_id === user.id) {
                                        return (
                                            <div key={comm.id}>
                                                <button className='add_btn'>+</button>
                                                <br/>
                                                <h3 className='cdmg'>{player.username} cdmg: 0</h3>
                                                <br/>
                                                <button className='sub_btn'>-</button>
                                            </div>
                                        )
                                    }
                                })}
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
                                    <button
                                        className='add_btn'
                                        onClick={() => addPoison(player.junction_id, player.poison, player.match_id)}
                                    >
                                    +
                                    </button>
                                    <br/>
                                    <h3 >Poison: {player.poison}</h3>
                                    <br/>
                                    <button
                                        className='sub_btn'
                                        onClick={() => subPoison(player.junction_id, player.poison, player.match_id)}
                                    >
                                        -
                                    </button>
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
                                    <button 
                                        className='sub_life_btn'
                                        onClick={() => subLife(player.junction_id, player.hp, player.match_id)}
                                    >
                                        -
                                    </button>
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