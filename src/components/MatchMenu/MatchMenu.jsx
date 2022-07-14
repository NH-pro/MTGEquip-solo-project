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
                history.push('/');
            }
        }
    }

    return (
        <>
            {matchInfo &&
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
                        <h2>Match #{matchInfo.id}</h2>
                        <TextField
                            id='note_input'
                            multiline 
                            onChange={(event) => setNote(event.target.value)}
                            label="match note"
                            variant='outlined'
                        />
                        <br/>
                        <Button
                            variant='contained'
                            onClick={() => addNote()}
                            color='success'
                        >
                            Add Note
                        </Button>
                        <br/>
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
                        <br/>
                        <Button 
                            onClick={() => submitAndExit()}
                            variant="contained"
                        >
                            Submit and Exit
                        </Button>
                        <br/>
                        <Button
                            onClick={() => history.goBack()}
                            variant="outlined"
                        >
                            Back
                        </Button>
                        {noteBundle.map((singleNote) => {
                            return (
                                <TextField
                                    multiline
                                    key={singleNote }
                                    defaultValue={singleNote}
                                    inputProps={
                                        { readOnly: true, }
                                    }
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