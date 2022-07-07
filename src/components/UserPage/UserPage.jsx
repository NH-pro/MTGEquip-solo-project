import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import {Link } from "react-router-dom";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
      <div className="user_container">
        <h1>Welcome to MTG Equip</h1>
        <h2>Hello, {user.username}!</h2>
        {/* <p>Your ID is: {user.id}</p> */}
        <Link to="/newMatch">
          <button>New Match</button>
        </Link>
        <br/>
        <Link to="/joinMatch">
          <button>Join Match</button>
        </Link>
        <br/>
        <LogOutButton className="btn" />
      </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
