import React from 'react';
import { Link } from "react-router-dom";

function JoinMatch() {

    return (
        <>
            <h2>Join Match</h2>
            <h3>Enter in the Match Code:</h3>
            <input type="text"/>
            <Link to="/match">
                <button>Join</button>
            </Link>
            <br/>
            <Link to="/user">
                <button>Back</button>
            </Link>
        </>
    )
};
export default JoinMatch;