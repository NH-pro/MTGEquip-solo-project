import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { TextField } from '@mui/material';
import { Grid, Stack, Button } from '@mui/material';


function MatchMenu() {
    const history = useHistory();
    const matchId = useParams();
    const user = useSelector((store) => store.user);
    const matchInfo = useSelector((store) => store.matchReducer);
    const matchUsers = useSelector(store => store.userMatchReducer);
    const dispatch = useDispatch();

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

    function submitAndExit() {
        for(let player of matchUsers) {
            if(player.user_id === user.id) {
                dispatch({
                    type: 'CREATE_MATCH_NOTE',
                    payload: {
                        note,
                        juncId: player.junction_id
                    }
                })

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
                            multiline 
                            onChange={(event) => setNote(event.target.value)}
                            label="match note"
                            variant='outlined'
                        />
                        <br/>
                        <Button 
                            onClick={() => submitAndExit()}
                            variant="contained"
                        >
                            Submit
                        </Button>
                        <br/>
                        <Button
                            onClick={() => history.goBack()}
                            variant="outlined"
                        >
                            Back
                        </Button>
                    </Stack>
                </Grid>
            }
        </>
    )
}
export default MatchMenu;