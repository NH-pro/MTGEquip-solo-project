import * as React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import { Button, Grid, Stack } from '@mui/material';


function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
      <Grid 
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Stack 
          direction="column"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={2}
        >
          <h1>Welcome to MTG Equip</h1>
          <h2>Hello, {user.username}!</h2>
          <Link to="/newMatch" style={{ textDecoration: 'none' }}>
            <Button variant="contained">New Match</Button>
          </Link>
          <Link to="/joinMatch" style={{ textDecoration: 'none' }}>
            <Button variant="contained">Join Match</Button>
          </Link>
          <Link to="/matchHistory" style={{ textDecoration: 'none' }}>
            <Button variant="contained">History</Button>
          </Link>
          <LogOutButton />
        </Stack>
      </Grid>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
