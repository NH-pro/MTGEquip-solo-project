import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch , useSelector } from 'react-redux';
import moment from 'moment';


function NewMatch() {
    const dispatch = useDispatch();
    const nextNum = useSelector((store) => store.fetchNextMatchNumber)

    useEffect(() => {
        dispatch({
            type: 'FETCH_NEXT_MATCH_NUMBER'
        })
    },[]);

    // This creates a new match entry in the "match" table.
    const creatNewMatch = () => {
        // Random number gen placeholder for a match code
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        // Using moment to grab the date.
        const date = moment().format("YYYY MM DD");
        // Combining random number and date into one object.
        const matchDetails = {
            code: randomNumber,
            date: date
        };

        // Dispatching new match details.
        dispatch({
            type: 'CREATE_MATCH_DB',
            payload: matchDetails
        })

    }


    return (
        <div className="newMatch_container">
            <h2>Next Match #: {nextNum}</h2>
            <h3>Match Code:</h3>
            <Link to="/match">
                <button onClick={creatNewMatch}>Start</button>
            </Link>
            <Link to="/user">
                <button>Back</button>
            </Link>
        </div>
    )
};
export default NewMatch;