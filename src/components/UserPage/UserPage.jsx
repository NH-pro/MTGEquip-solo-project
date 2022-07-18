import * as React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import { Button, Grid, Stack, Card, Typography } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import CreateIcon from '@mui/icons-material/Create';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
      <Grid 
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundImage: "url(https://media2.giphy.com/media/Pch8FiF08bc1G/giphy.gif?cid=ecf05e47ad1tt5e0j6k3c22fxtydxlrs08mdqc3ysj8bbwld&rid=giphy.gif&ct=g)",
          backgroundSize: "500px 630px",
          paddingBottom: "6em",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Card
          elevation={6}
          sx={{
            padding: "1em",
            marginTop: "4.5em",
            paddingBottom: "2em",
            backgroundColor: '#F2BF5E'
          }}
        >
          <Stack 
            direction="column"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={2}
          >
            <Typography
              variant='h4'
              sx={{
                backgroundColor: "#D99D55",
                color: 'white',
                borderRadius: '5px',
                padding: '.25em'
              }}
            >
              ⭑ MTG Equip ⭑
            </Typography>
            <Typography
              variant='h5'
              sx={{
                color: '#73482F',
                fontWeight: 'bold'
              }}
            >
              Hello, {user.username}!
            </Typography>
            <br/>
            <Link to="/newMatch" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#4F698C"
                }}
              >
                New Match &nbsp; <CreateIcon/>
              </Button>
            </Link>
            <Link to="/joinMatch" style={{ textDecoration: 'none' }}>
              <Button 
                variant="contained"
                sx={{
                  backgroundColor: "#4F698C"
                }}
              >
                Join Match &nbsp; <ConnectWithoutContactIcon/>
              </Button>
            </Link>
            <Link to="/matchHistory" style={{ textDecoration: 'none' }}>
              <Button 
                variant="contained"
                sx={{
                  backgroundColor: "#4F698C"
                }}
              >
                History &nbsp; <LibraryBooksIcon/>
              </Button>
            </Link>
            <br/>
            <LogOutButton />
            <Link to='/about' style={{ textDecoration: 'none' }}>
              <Button
                sx={{
                  color: "#73482F"
                }}
              >
                About
              </Button>
            </Link>
          </Stack>
        </Card>
      </Grid>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
