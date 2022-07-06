import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import {HashRouter as Router, Link } from "react-router-dom";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <Router>
      <div className="container">
        <h1>Welcome to MTG Equip</h1>
        <h2>Hello, {user.username}!</h2>
        {/* <p>Your ID is: {user.id}</p> */}
        <Link to="/newMatch">New Match</Link>
        <LogOutButton className="btn" />
      </div>
    </Router>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
