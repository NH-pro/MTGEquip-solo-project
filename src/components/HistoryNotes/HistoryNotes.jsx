import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Grid, Stack, Button, TextField, Card } from '@mui/material';



function HistoryNotes() {
    const history = useHistory();
    const dispatch = useDispatch();
    const matchId = useParams();
    const notes = useSelector((store) => store.notesReducers.matchNotes);
    const [newNote, setNewNote] = useState('');
    const matchUsers = useSelector(store => store.userMatchReducer);
    const user = useSelector((store) => store.user);



    useEffect(() => {
        dispatch({
            type: 'FETCH_MATCH_NOTES',
            payload: matchId
        })

        dispatch({
            type: 'FETCH_MATCH_USERS',
            payload: matchId
        });
    }, [])

    function deleteNote(noteId) {
        dispatch({
            type: 'DELETE_NOTE',
            payload: {
                noteId,
                matchId
            }
        })

    }

    function addNote() {
        for (let player of matchUsers) {
            if (player.user_id === user.id) {
                dispatch({
                    type: 'CREATE_MATCH_NOTE',
                    payload: {
                        singleNote: newNote,
                        juncId: player.junction_id,
                        matchId
                    }
                })
            }
        }
    }

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
                {notes &&
                    <div>
                        {notes.map((singleNote) => {
                            return (
                                <Card
                                    key={singleNote.id}
                                    elevation={4}
                                    sx={{
                                        margin: "1em"
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        justifyContent="space-evenly"
                                        alignItems="center"
                                        spacing={0}
                                    >
                                        <TextField
                                            multiline
                                            defaultValue={singleNote.note}
                                            maxLength="400"
                                            sx={{
                                                margin: "1em"
                                            }}
                                        />
                                        <Button
                                            onClick={() => deleteNote(singleNote.id)}
                                            variant="contained"
                                            color="error"
                                            size='small'
                                            sx={{
                                                margin: "1em"
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </Stack>
                                    
                                </Card>
                            )
                        })}
                    </div>
                }
                <Card
                    elevation={4}
                >
                    <Stack
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="center"
                        spacing={0}
                    >
                        <form onSubmit={() => addNote()}>
                            <TextField
                                onChange={(event) => setNewNote(event.target.value)}
                                multiline
                                maxLength="400"
                                sx={{
                                    margin: "1em"
                                }}
                            />
                            <Button
                                type='submit'
                                variant="contained"
                                sx={{
                                    margin: "1em"
                                }}
                            >
                                Add Note
                            </Button>
                        </form>
                    </Stack>
                </Card>
                <Button
                    onClick={() => history.push('/matchHistory')}
                    variant="contained"
                >
                    Back
                </Button>
            </Stack>
        </Grid>
    )
}
export default HistoryNotes;