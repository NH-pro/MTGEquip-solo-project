import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

function JoinMatch() {
    const dispatch = useDispatch();
    const [matchCode, setMatchCode] = useState('');
    const matchNum = useSelector((store) => store.fetchNextMatchNumber);
    const history = useHistory();


    const joinMatch = () => {
        dispatch({
            type: 'ADD_PLAYER',
            payload: {
                matchCode
            }
        })
    }

    const enter = () => {
        history.push(`/lobby/${matchNum}`);
    }

    return (
        <>
            <h2>Join Match</h2>
            <h3>Enter in the Match Code:</h3>
            <input 
                type="text" 
                placeholder='match code...'
                onChange={(event) => {setMatchCode(event.target.value)}}
            />
            <button onClick={() => joinMatch()}>Join</button>
            <button onClick={enter}>Enter Lobby</button>
            <br/>
            <Link to="/user">
                <button>Back</button>
            </Link>
        </>
    )
};
export default JoinMatch;