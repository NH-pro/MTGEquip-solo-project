import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Stack, Button, TextField, Typography, Card } from '@mui/material';


function JoinMatch() {
    const dispatch = useDispatch();
    const [matchCode, setMatchCode] = useState('');
    const matchNum = useSelector((store) => store.fetchNextMatchNumber);
    const history = useHistory();
    const [btnDisabled, setBtnDisabled] = useState(true)

    const submitJoin = () => {
        if(matchCode !== '') {
            dispatch({
                type: 'ADD_PLAYER',
                payload: {
                    matchCode
                }
            })
            setBtnDisabled(false);
        }
        else {
            alert('Match Code cannot be blank!')
        }
    }

    const enter = () => {
        if (matchNum === null) {
            alert('Error, match does not exist!')
        }
        else {
            history.push(`/lobby/${matchNum}`);
        }
    }

    return (
        <Grid 
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
                marginTop: '4em',
                marginBottom: '1em',
                backgroundColor: "#F2BF5E",
                padding: "2em",
                borderRadius: "10px"
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
                        backgroundColor: '#D93829',
                        color: 'white',
                        padding: '.5em',
                        borderRadius: '5px'
                    }}
                >
                    Join Match
                </Typography>
                <Typography
                    variant='h6'
                >
                    Enter in the Match Code:
                </Typography>
                <TextField
                    type="text"
                    label='match code...'
                    onChange={(event) => {setMatchCode(event.target.value)}}
                />
                <Button
                    onClick={() => submitJoin()}
                    variant= 'contained'
                    sx={{
                        backgroundColor: "#4F698C"
                    }}
                >
                    Submit
                </Button>
                <Button
                    disabled={btnDisabled}
                    onClick={enter}
                    variant= 'contained'
                    sx={{
                        backgroundColor: "#4F698C"
                    }}
                >
                    Enter Lobby
                </Button>
                <br/>
                <Link 
                    to="/user"
                    style={{textDecoration: 'none'}}
                >
                    <Button
                        variant='contained'
                        sx={{
                            backgroundColor: "#D99D55"
                        }}
                    >
                        Back
                    </Button>
                </Link>
            </Stack>
        </Grid>
    )
};
export default JoinMatch;