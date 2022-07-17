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
                marginTop: '2em'
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
                        marginTop: '1em',
                        backgroundColor: 'crimson',
                        color: 'white',
                        padding: '.25em',
                        borderRadius: '5px',
                        marginBottom: '1em'
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
                >
                    Submit
                </Button>
                <Button
                    disabled={btnDisabled}
                    onClick={enter}
                    variant= 'contained'
                >
                    Enter Lobby
                </Button>
                <br/>
                <Link to="/user">
                    <button>Back</button>
                </Link>
            </Stack>
        </Grid>
    )
};
export default JoinMatch;