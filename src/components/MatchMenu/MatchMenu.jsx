import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Grid, Stack, Button, TextField, Switch, FormGroup, FormControlLabel, Typography } from '@mui/material';


function MatchMenu() {
    const history = useHistory();
    const matchId = useParams();
    const user = useSelector((store) => store.user);
    const matchInfo = useSelector((store) => store.matchReducer);
    const matchUsers = useSelector(store => store.userMatchReducer);
    const dispatch = useDispatch();

    const [noteBundle, setNoteBundle] = useState([])
    const [note, setNote] = useState('');
    const [winner, setWinner] = useState('');


    useEffect(() => {
        dispatch({
            type: 'FETCH_MATCH_INFO',
            payload: matchId
        })
        dispatch({
            type: 'FETCH_MATCH_USERS',
            payload: matchId
        });
    },[])

    console.log('this is matchId', matchId)

    function playerResult() {
        console.log('in playerResult')
        if(winner === '') {
            for(let player of matchUsers) {
                if(player.user_id === user.id) {
                    setWinner(user.id);
                }
            }
        }
        else {
            setWinner('')
        }
    }

    function addNote() {
        if(note !== '') {
            setNoteBundle(noteBundle => ([
                ...noteBundle,
                note
            ]))
        }
        else {
            alert('Cannot add an empty note!');
        }
        document.getElementById('note_input').value = '';
        setNote('');
    }


    function submitAndExit() {
        for(let player of matchUsers) {
            if(player.user_id === user.id) {
                for(let singleNote of noteBundle) {
                    dispatch({
                        type: 'CREATE_MATCH_NOTE',
                        payload: {
                            singleNote,
                            juncId: player.junction_id,
                            matchId
                        }
                    })
                }
                dispatch({
                    type: 'EDIT_MATCH_WINNER',
                    payload: {
                        winner,
                        matchId
                    }
                })
            }
        }
        history.push('/');
    }

    return (
        <>
            {matchInfo &&
                <Grid 
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        marginTop: '3em',
                        marginBottom: '1em',
                        backgroundColor: "#F2BF5E",
                        padding: "1em",
                        borderRadius: "10px"
                    }}
                >
                    <Stack 
                        direction="column"
                        justifyContent="space-evenly"
                        alignItems="center"
                        spacing={4}
                    >
                        <h2>Match #{matchInfo.id}</h2>
                        <Stack 
                            direction="row"
                            alignItems="center"
                        >
                            <Typography
                                sx={{
                                    marginTop: "1.5em"
                                }}
                            >
                                Lost
                            </Typography>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            color='warning'
                                            onChange={() => playerResult()}
                                        />
                                    }
                                    label="Match Result"
                                    labelPlacement='top'
                                    sx={{
                                        margin: "0px 0px"
                                    }}  
                                />
                            </FormGroup>
                            <Typography
                                sx={{
                                    marginTop: "1.5em"
                                }}
                            >
                                Won
                            </Typography>
                        </Stack>
                        <TextField
                            id='note_input'
                            multiline 
                            onChange={(event) => setNote(event.target.value)}
                            label="match note"
                            variant='outlined'
                            sx={{
                                backgroundColor: "white",
                                borderRadius: '6px'
                            }}
                        />
                        <Button
                            variant= 'contained'
                            sx={{
                                backgroundColor: "#D93829"
                            }}
                            onClick={() => addNote()}
                            
                        >
                            Add Note
                        </Button>
                        <Button 
                            onClick={() => submitAndExit()}
                            variant= 'contained'
                            sx={{
                                backgroundColor: "#4F698C"
                            }}
                        >
                            Submit and Exit
                        </Button>
                        <Button
                            onClick={() => history.push(`/match/${matchId.matchId}`)}
                            variant='contained'
                            sx={{
                                backgroundColor: "#73482F"
                            }}
                        >
                            Back
                        </Button>
                        <br/>
                        {noteBundle.map((singleNote) => {
                            return (
                                <TextField
                                    multiline
                                    key={singleNote }
                                    defaultValue={singleNote}
                                    inputProps={
                                        { readOnly: true, }
                                    }
                                    sx={{
                                        backgroundColor: "white",
                                        borderRadius: '6px'
                                    }}
                                >
                                </TextField>
                            )
                        })}
                    </Stack>
                </Grid>
            }
        </>
    )
}
export default MatchMenu;