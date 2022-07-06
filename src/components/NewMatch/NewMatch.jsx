import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch , useSelector } from 'react-redux';
import moment from 'moment';


function NewMatch() {
    const dispatch = useDispatch();

    useEffect(() => {
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        const date = moment().format("YYYY MM DD");
        const matchDetails = {
            code: randomNumber,
            date: date
        };

        dispatch({
            type: 'CREATE_MATCH_DB',
            payload: matchDetails
        })
    },[]);


    return (
        <div className="newMatch_container">
            <h2>Match #</h2>
            <h3>Match Code:</h3>
            <Link to="/match">
                <button>Start</button>
            </Link>
            <Link to="/user">
                <button>Back</button>
            </Link>
        </div>
    )
};
export default NewMatch;