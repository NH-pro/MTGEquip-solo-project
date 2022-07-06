import React from 'react';
import { Link } from "react-router-dom";


function NewMatch() {

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