import React, { useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function Lobby() {
    const dispatch = useDispatch();
    let matchId = useParams();


    useEffect(() => {

    })

    return (
        <>
            <h2>Players in Lobby</h2>
            <button>Launch Game</button>
        </>
    )
}
export default Lobby;